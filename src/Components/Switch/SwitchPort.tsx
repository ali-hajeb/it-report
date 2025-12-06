import { INewSwitchPort, ISwitch, switchActions } from "@/src/lib/module/switch";
import { Button, Group, Input, InputWrapper, Select, Stack } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendar, IconCheck, IconExclamationCircle } from "@tabler/icons-react";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { IButtonState } from "@/src/common/type/button.types";
import { MAX_ROWS } from "@/src/Constants";
import { SwitchPortForm } from "./types";
import { filters, switchPortSchemaFields } from "./constants";
import { getCustomFieldValue, getSwitchPortCustomFieldValue } from "./utils";
import { ISwitchPortPopulated, ISwitchPopulated } from "@/src/lib/module/common/types";
import UserContext from "@/src/Contexts/UserContext";
import TableView, { renderFormFromSchema, SelectOption } from "@/src/Components/TableView";
import { ILocation, locationActions } from "@/src/lib/module/location";

const LIMIT = MAX_ROWS;

export interface SwitchPortProps {
    location?: string;
    switchPorts: ISwitchPortPopulated[];
    setSwitchPorts: Dispatch<SetStateAction<ISwitchPortPopulated[]>>;
}

export default function SwitchPort({
    location,
    switchPorts,
    setSwitchPorts
}: SwitchPortProps) {
    const userContext = useContext(UserContext);
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [editMode, setEditMode] = useState<string | null>(null);
    const [btnState, setBtnState] = useState<IButtonState>({color: undefined, icon: undefined})
    const [viewMode, setViewMode] = useState<ISwitchPortPopulated | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [isListLoading, setListLoading] = useState(true);
    const [locationOptions, setLocationOptions] = useState<SelectOption[]>([]);
    const [switchOptions, setSwitchOptions] = useState<SelectOption[]>([]);

    const [opened, {open, close}] = useDisclosure(false);

    const switchPortForm = useForm<SwitchPortForm>({
        mode: 'controlled',
        initialValues: {
            switch: '',
            switchName: '',
            status: '',
            port: '',
            portType: '',
            vlans: [],
            speed: '',
            poe: false,
            connectedDevice: '',
            connectedDeviceType: '',
            desc: '',
            location: '',
        },
    })

    useEffect(() => {
        switchActions.getSwitchPorts({ location, skip: page.toString() })
            .then((res) => {
                setSwitchPorts(res.data.switchPorts);
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
        switchPortForm.reset();
        setEditMode(null);
        setViewMode(null);
        close();
    }

    const newSwitchPortHandler = () => {
        setEditMode(null);
        open();
    }

    const deleteSwitchPortHandler = (id: string) => {
        setLoading(true);
        switchActions.deleteSwitchPort(id)
            .then(_ => {
                setSwitchPorts(s => {
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
        const _switch = switchPorts.find(r => r._id === id);
        if (_switch) {
            setViewMode(_switch);
            open();
        }
    }

    const editSwitchPortHandler = (id: string) => {
        console.log(id);
        const item = switchPorts.find(a => a._id === id);
        if (item) {
            console.log(item);
            const { switch: _switch,...data} = item;
            switchPortForm.setValues({
                ...data,
                switch: _switch._id,
                port: data.port.toString(),
                speed: data.speed.toString(),
                location: data.location._id,
            });
            setEditMode(id);
            open();
        }
    }

    const formOnSubmit = (values: SwitchPortForm) => {
        console.log('switch submit');
        const selectedDevice = switchOptions.find(d => d.value === values.switch);
        const standardValue = {
            ...values,
            port: parseInt(values.port),
            switchName: selectedDevice?.label || '',
            speed: parseInt(values.speed),
        } as INewSwitchPort;

        console.log('form', standardValue);

        setLoading(true);
        if (editMode) {
            switchActions.updateSwitchPort({_id: editMode, ...standardValue}).then(res => {
                setSwitchPorts(s => {
                    const updated = [...s];
                    const index = updated.findIndex(a => a._id === editMode);
                    if (index > -1) {
                        updated[index] = {...res.data?._switch};
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
            switchActions.createSwitchPort(standardValue).then(res => {
                setSwitchPorts(s => {
                    console.log(s);
                    return [...s, {...res.data?._switch}];
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
        switchActions.getSwitchPorts({...query})
            .then((res) => {
                setSwitchPorts(res.data._switches);
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
            customFieldValue={getSwitchPortCustomFieldValue}
            fields={switchPortSchemaFields}
            viewMode={viewMode}
            close={close}
            closeHandler={modalOnCloseHandler}
            opened={opened}
            title="پورت‌ها"
            editMode={editMode}>
            <Form form={switchPortForm} onSubmit={formOnSubmit}>
                <Stack gap={'md'}>
                    {
                        userContext?.role === 'MANAGER' &&
                            <Select
                                label='نام مرکز'
                                placeholder="انتخاب کنید"
                                data={locationOptions}
                                key={switchPortForm.key('location')}
                                {...switchPortForm.getInputProps('location')}
                            />
                    }
                    <Select
                        label='روتر'
                        placeholder="دستگاه مورد نظر را انتخاب کنید..."
                        data={switchOptions}
                        key={switchPortForm.key('switch')}
                        {...switchPortForm.getInputProps('switch')}
                        searchable/>
                    {
                        renderFormFromSchema(switchPortSchemaFields, switchPortForm)
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
            newItem={newSwitchPortHandler}
            reportHandler={() => {}}
            searchHandler={searchHandler}
            reportFields={switchPortSchemaFields}
            data={switchPorts}
            title="پورت‌ها" />
        <TableView.TableContainer
            customFieldValue={getSwitchPortCustomFieldValue}
            viewItemHandler={viewMaintenanceReportHandler}
            data={switchPorts}
            fields={switchPortSchemaFields}
            isLoading={isListLoading}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            deleteItemHandler={deleteSwitchPortHandler}
            editItemHandler={editSwitchPortHandler}
            maxRows={MAX_ROWS} />
    </TableView>
}
