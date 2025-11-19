import { antennaActions, IAntennaLink } from "@/src/lib/module/antenna";
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
import { AntennaForm } from "./types";
import { antennaSchemaFields, filters } from "./constants";
import { getCustomFieldValue } from "./utils";
import { IAntennaPopulated } from "@/src/lib/module/common/types";
import UserContext from "@/src/Contexts/UserContext";
import TableView, { renderFormFromSchema, SelectOption } from "@/src/Components/TableView";
import { ILocation, locationActions } from "@/src/lib/module/location";

const LIMIT = MAX_ROWS;

export interface AntennaListProps {
    location?: string;
    antennas: IAntennaPopulated[];
    setAntennas: Dispatch<SetStateAction<IAntennaPopulated[]>>;
}

export default function AntennaList({
    location,
    antennas,
    setAntennas
}: AntennaListProps) {
    const userContext = useContext(UserContext);
    const [date, setDate] = useState<string>(new Date().toISOString());
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [editMode, setEditMode] = useState<string | null>(null);
    const [btnState, setBtnState] = useState<IButtonState>({color: undefined, icon: undefined})
    const [viewMode, setViewMode] = useState<IAntennaPopulated | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [isListLoading, setListLoading] = useState(true);
    const [locationOptions, setLocationOptions] = useState<SelectOption[]>([]);
    const [linkOptions, setLinkOptions] = useState<SelectOption[]>([]);

    const [opened, {open, close}] = useDisclosure(false);

    const antennaForm = useForm<AntennaForm>({
        mode: 'controlled',
        initialValues: {
            name: '',
            type: '',
            model: '',
            frequency: '',
            output: '',
            gain: '',
            installedLocation: '',
            height: '',
            angle: '',
            azimuth: '',
            connectedLink: '',
            linkType: '',
            relatedEquipment: '',
            ip: '',
            macAddress: '',
            location: userContext?.location?._id || '',
            connectionType: '',
            firmware: '',
            support: '',
            status: '',
            notes: '',
        },
    })

    useEffect(() => {
        antennaActions.getAntennas({ location, skip: page.toString() })
            .then((res) => {
                setAntennas(res.data.antennas);
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
    }, []);


    useEffect(() => {
            antennaActions.getAntennaLinks({ location: userContext?.location._id })
                .then((res) => {
                    const antennaLinks = res.data.antennaLinks as IAntennaLink[];
                    const linkOptions = antennaLinks.map(l => ({value: l._id, label: l.name}));
                    setLinkOptions(linkOptions);
                })
                .catch(error => {
                    console.error(error);
                })
    }, []);

    const modalOnCloseHandler = () => {
        antennaForm.reset();
        setEditMode(null);
        setViewMode(null);
        close();
    }

    const newAntennaHandler = () => {
        setEditMode(null);
        open();
    }

    const deleteAntennaHandler = (id: string) => {
        setLoading(true);
        antennaActions.deleteAntenna(id)
            .then(_ => {
                setAntennas(s => {
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
        const antenna = antennas.find(r => r._id === id);
        if (antenna) {
            setViewMode(antenna);
            open();
        }
    }

    const editAntennaHandler = (id: string) => {
            console.log(id);
            const item = antennas.find(a => a._id === id);
            if (item) {
                console.log(item);
                const { installationDate, ...data} = item;
                antennaForm.setValues({
                    ...data,
                    frequency: data.frequency.toString(),
                    output: data.output.toString(),
                    height: data.height.toString(),
                    gain: data.gain.toString(),
                    azimuth: data.azimuth.toString(),
                    location: data.location._id,
                    connectedLink: data.connectedLink?.toString()
                });
                setDate(installationDate);
                setEditMode(id);
                open();
            }
    }


    const calendarOnChangeHandler = (date: DateObject) => {
        console.log(date.toDate().toISOString());
        setDate(date.toDate().toISOString());
    };

    const formOnSubmit = (values: AntennaForm) => {
        console.log('antenna submit');
        const standardValue = {
            ...values,
            frequency: parseFloat(values.frequency),
            output: parseFloat(values.output),
            height: parseFloat(values.height),
            gain: parseFloat(values.gain),
            azimuth: parseFloat(values.azimuth),
            connectedLink: values.connectedLink || null,
            installationDate: date,
            maintenance: [],
        }

        console.log('form', standardValue);

        setLoading(true);
        if (editMode) {
            antennaActions.updateAntenna({_id: editMode, ...standardValue}).then(res => {
                setAntennas(s => {
                    const updated = [...s];
                    const index = updated.findIndex(a => a._id === editMode);
                    if (index > -1) {
                        updated[index] = {...res.data?.antenna};
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
            antennaActions.createAntenna(standardValue).then(res => {
                setAntennas(s => {
                    return [...s, {...res.data?.antenna}];
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
        antennaActions.getAntennas({...query})
            .then((res) => {
                setAntennas(res.data.antennas);
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
            customFieldValue={getCustomFieldValue}
            fields={antennaSchemaFields}
            viewMode={viewMode}
            close={close}
            closeHandler={modalOnCloseHandler}
            opened={opened}
            title="آنتن"
            editMode={editMode}>
            <Form form={antennaForm} onSubmit={formOnSubmit}>
                <Stack gap={'md'}>
                    <InputWrapper label='تاریخ نصب'>
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
                            value={date}
                            onChange={calendarOnChangeHandler}
                            calendarPosition="center" />
                    </InputWrapper>
                    {
                        userContext?.role === 'MANAGER' &&
                            <Select
                                label='نام مرکز'
                                placeholder="انتخاب کنید"
                                data={locationOptions}
                                key={antennaForm.key('location')}
                                {...antennaForm.getInputProps('location')}
                            />
                    }
                    {
                        renderFormFromSchema(antennaSchemaFields, antennaForm)
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
            newItem={newAntennaHandler}
            reportHandler={() => {}}
            searchHandler={searchHandler}
            title="آنتن" />
        <TableView.TableContainer
            customFieldValue={getCustomFieldValue}
            viewItemHandler={viewMaintenanceReportHandler}
            data={antennas}
            fields={antennaSchemaFields}
            isLoading={isListLoading}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            deleteItemHandler={deleteAntennaHandler}
            editItemHandler={editAntennaHandler}
            scrollContainer={2100}
            maxRows={MAX_ROWS} />
    </TableView>
}
