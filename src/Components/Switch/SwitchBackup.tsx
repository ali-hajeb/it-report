import { IButtonState } from "@/src/common/type/button.types";
import TableView, { renderFormFromSchema, SelectOption } from "@/src/Components/TableView";
import UserContext from "@/src/Contexts/UserContext";
import { ISwitchBackupPopulated, ISwitchPopulated } from "@/src/lib/module/common/types";
import { Form, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { MAX_ROWS } from "@/src/Constants";
import { ILocation, locationActions } from "@/src/lib/module/location";
import { INewSwitchBackup, switchActions } from '@/src/lib/module/switch';
import { IconCalendar, IconCheck, IconExclamationCircle } from "@tabler/icons-react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Button, Group, Input, InputWrapper, Select, Stack } from "@mantine/core";
import { getSwitchBackupCustomFieldValue } from "./utils";
import { switchBackupSchemaFields } from "./constants";
import { filters } from "./constants";
import { SwitchBackupForm } from "./types";

const LIMIT = MAX_ROWS;

export interface SwitchBackupProps {
    location?: string;
    switchBackups: ISwitchBackupPopulated[];
    setSwitchBackups:  Dispatch<SetStateAction<ISwitchBackupPopulated[]>>;
}

export default function SwitchBackup({
    location,
    switchBackups,
    setSwitchBackups
}: SwitchBackupProps) {
    const userContext = useContext(UserContext);
    const [lastBackup, setLastBackup] = useState<string>(new Date().toISOString());
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [editMode, setEditMode] = useState<string | null>(null);
    const [btnState, setBtnState] = useState<IButtonState>({color: undefined, icon: undefined})
    const [viewMode, setViewMode] = useState<ISwitchBackupPopulated | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [isListLoading, setListLoading] = useState(true);
    const [locationOptions, setLocationOptions] = useState<SelectOption[]>([]);
    const [switchOptions, setSwitchOptions] = useState<SelectOption[]>([]);

    const [opened, {open, close}] = useDisclosure(false);

    const switchBackupForm = useForm<SwitchBackupForm>({
        mode: 'controlled',
        initialValues: {
            switch: '',
            switchName: '',
            storage: '',
            operator: '',
            type: '',
            desc: '',
            location: '',
        },
    })

    useEffect(() => {
        switchActions.getSwitchBackups({ location, skip: page.toString() })
            .then((res) => {
                setSwitchBackups(res.data.switchBackups);
                setTotalPages(Math.ceil(res.data.count / LIMIT));
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setListLoading(false)
            });
    }, [page]);

    useEffect(() => {
        if (userContext?.role === 'MANAGER') {
            locationActions.getLocations()
                .then((res) => {
                    const locations = res.data.locations as ILocation[];
                    const locationOptions = locations.map(l => ({value: l._id, label: l.name}));
                    setLocationOptions(locationOptions);
                })
                .catch(error => {
                    console.error(error);
                })
        }

        let params = {};
        if (userContext?.role === 'ADMIN') {
            params = {...params, location: userContext.location._id};
        }
        switchActions.getSwitches(params)
            .then((res) => {
                const switches = res.data._switches as ISwitchPopulated[];
                const switchOptions = switches.map(l => ({value: l._id, label: l.switchName}));
                console.log('opt', switchOptions);
                setSwitchOptions(switchOptions);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const modalOnCloseHandler = () => {
        switchBackupForm.reset();
        setEditMode(null);
        setViewMode(null);
        close();
    }

    const newswitchBackupHandler = () => {
        setEditMode(null);
        open();
    }

    const deleteswitchBackupHandler = (id: string) => {
        setLoading(true);
        switchActions.deleteSwitchBackup(id)
            .then(_ => {
                setSwitchBackups(s => {
                    const updated = [...s];
                    const index = updated.findIndex(a => a._id === id);
                    if (index > -1) {
                        updated.splice(index, 1);
                    }
                    return updated;
                })
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const viewMaintenanceReportHandler = (id: string) => {
        const switchBackup = switchBackups.find(r => r._id === id);
        if (switchBackup) {
            setViewMode(switchBackup);
            open();
        }
    }

    const editswitchBackupHandler = (id: string) => {
        console.log(id);
        const item = switchBackups.find(a => a._id === id);
        if (item) {
            console.log(item);
            const { lastBackupDate, switch: _switch, ...data} = item;
            switchBackupForm.setValues({
                ...data,
                switch: _switch._id,
                location: data.location._id,
            });
            lastBackupDate && setLastBackup(lastBackupDate);
            setEditMode(id);
            open();
        }
    }


    const calendarSwitchBackupOnChangeHandler = (date: DateObject) => {
        console.log(date.toDate().toISOString());
        setLastBackup(date.toDate().toISOString());
    };

    const formOnSubmit = (values: SwitchBackupForm) => {
        console.log('switchBackup submit');
        const selectedDevice = switchOptions.find(d => d.value === values.switch);
        const standardValue = {
            ...values,
            lastBackupDate: lastBackup,
            switchName: selectedDevice?.label || '',
        } as INewSwitchBackup;

        console.log('form', standardValue);

        setLoading(true);
        if (editMode) {
            switchActions.updateSwitchBackup({_id: editMode, ...standardValue}).then(res => {
                setSwitchBackups(s => {
                    const updated = [...s];
                    const index = updated.findIndex(a => a._id === editMode);
                    if (index > -1) {
                        updated[index] = {...res.data?.switchBackup};
                    }
                    return updated;
                })
                setBtnState({color: 'green', icon: <IconCheck size={16} />});
            })
                .catch(error => {
                    console.error(error);
                    setBtnState({color: 'red', icon: <IconExclamationCircle size={16} />});
                })
                .finally(() => {
                    setLoading(false);
                    setTimeout(() => {
                        setBtnState({color: undefined, icon: undefined});
                    }, 1000);
                });
        } else {
            switchActions.createSwitchBackup(standardValue).then(res => {
                setSwitchBackups(s => {
                    return [...s, {...res.data?.switchBackup}];
                })
                setBtnState({color: 'green', icon: <IconCheck size={16} />});
            })
                .catch(error => {
                    console.error(error);
                    setBtnState({color: 'red', icon: <IconExclamationCircle size={16} />});
                })
                .finally(() => {
                    setLoading(false);
                    setTimeout(() => {
                        setBtnState({color: undefined, icon: undefined});
                    }, 1000);
                });
        }
    }

    const searchHandler = (query: Record<string, string>) => {
        setListLoading(true);
        switchActions.getSwitchBackups({...query})
            .then((res) => {
                setSwitchBackups(res.data.switchBackups);
                setPage(0);
                // setTotalPages(res.data.count);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setListLoading(false);
            });
    };

    return <TableView>
        <TableView.Modal 
            customFieldValue={getSwitchBackupCustomFieldValue}
            fields={switchBackupSchemaFields}
            viewMode={viewMode}
            close={close}
            closeHandler={modalOnCloseHandler}
            opened={opened}
            title="گزارش پشتیبان"
            editMode={editMode}>
            <Form form={switchBackupForm} onSubmit={formOnSubmit}>
                <Stack gap={'md'}>
                    <InputWrapper label='تاریخ آخرین پشتیبان‌گیری'>
                        <DatePicker
                            containerStyle={{width: '100%'}}
                            render={(value, openCalendar) => 
                                <Group>
                                    <Button p={4} maw={32} mah={32} onClick={openCalendar}><IconCalendar size={24} /></Button>
                                    <Input style={{flexGrow: 2}} value={value} readOnly/>
                                </Group>
                            } 
                            calendar={persian}
                            locale={persian_fa} 
                            value={lastBackup}
                            onChange={calendarSwitchBackupOnChangeHandler}
                            calendarPosition="center" />
                    </InputWrapper>
                    {
                        userContext?.role === 'MANAGER' &&
                            <Select
                                label='نام مرکز'
                                placeholder="انتخاب کنید"
                                data={locationOptions}
                                key={switchBackupForm.key('location')}
                                {...switchBackupForm.getInputProps('location')}
                            />
                    }
                    <Select
                        label='روتر'
                        placeholder="دستگاه مورد نظر را انتخاب کنید..."
                        data={switchOptions}
                        key={switchBackupForm.key('switch')}
                        {...switchBackupForm.getInputProps('switch')}
                        searchable/>
                    {
                        renderFormFromSchema(switchBackupSchemaFields, switchBackupForm)
                    }
                    <Button type="submit" 
                        loading={isLoading} 
                        color={btnState.color} 
                        rightSection={btnState.icon}
                        fullWidth>
                        ثبت
                    </Button>
                </Stack>
            </Form>
        </TableView.Modal>
        <TableView.TopBar
            filters={filters}
            newItem={newswitchBackupHandler}
            reportHandler={() => {}}
            searchHandler={searchHandler}
            reportFields={switchBackupSchemaFields}
            data={switchBackups}
            title="گزارش پشتیبان" />
        <TableView.TableContainer
            customFieldValue={getSwitchBackupCustomFieldValue}
            viewItemHandler={viewMaintenanceReportHandler}
            data={switchBackups}
            fields={switchBackupSchemaFields}
            isLoading={isListLoading}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            deleteItemHandler={deleteswitchBackupHandler}
            editItemHandler={editswitchBackupHandler}
            maxRows={MAX_ROWS} />
    </TableView>
}
