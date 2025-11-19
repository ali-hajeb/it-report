import { IButtonState } from '@/src/common/type/button.types';
import UserContext from '@/src/Contexts/UserContext';
import { IMaintenanceReport, maintenanceReportActions } from '@/src/lib/module/maintenanceReport';
import type { DeviceType, INewMaintenanceReport } from '@/src/lib/module/maintenanceReport/maintenanceReport.types';
import { all, AxiosResponse } from 'axios';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import TableView, { renderFormFromSchema, SelectOption } from '@/src/Components/TableView';
import { useDisclosure } from '@mantine/hooks';
import { Form, useForm } from '@mantine/form';
import { antennaActions } from '@/src/lib/module/antenna';
import { IconCalendar, IconCheck, IconExclamationCircle } from '@tabler/icons-react';
import { Button, Group, Input, InputWrapper, Select, Stack } from '@mantine/core';
import { MAX_ROWS } from '@/src/Constants';
import { Actions, MaintenanceReportForm } from './types';
import { filters, maintenanceReportSchemaFields } from './constants';
import { getCustomFieldValue } from './utils';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { IMaintenanceReportPopulated } from '@/src/lib/module/common/types';
import { ILocation, locationActions } from '@/src/lib/module/location';

const actions: Actions = {
    antenna: antennaActions.getAntennas,
    router: null,
    server: null,
    switch: null,
    other: null
};

export interface MaintenanceReportsProps {
    location?: string;
    type?: DeviceType;
    maintenanceReports: IMaintenanceReportPopulated[];
    setMaintenanceReports: Dispatch<SetStateAction<IMaintenanceReportPopulated[]>>;
}

export default function MaintenanceReports({
    maintenanceReports,
    setMaintenanceReports,
    location,
    type
}: MaintenanceReportsProps) {
    const userContext = useContext(UserContext);
    const [page, setPage] = useState<number>(0);
    const [date, setDate] = useState<string>(new Date().toISOString());
    const [totalPages, setTotalPages] = useState<number>(1);
    const [editMode, setEditMode] = useState<string | null>(null);
    const [btnState, setBtnState] = useState<IButtonState>({color: undefined, icon: undefined})
    const [viewMode, setViewMode] = useState<IMaintenanceReportPopulated | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [isListLoading, setListLoading] = useState(true);
    const [deviceOptions, setDeviceOptions] = useState<SelectOption[]>([]);
    const [locationOptions, setLocationOptions] = useState<SelectOption[]>([]);

    const [opened, {open, close}] = useDisclosure(false);

    const maintenanceReportForm = useForm<MaintenanceReportForm>({
        mode: 'controlled',
        initialValues: {
            device: '',
            deviceType: type || '',
            desc: '',
            location: userContext?.location._id || '', 
            operation: '',
            operator: '',
            replacements: ''
        }
    });

    useEffect(() => {
        let params = {};
        if (userContext?.role === 'ADMIN') {
            params = { location: userContext.location._id };
        }
        if (location) {
            params = { ...params, location };
        }
        (type ? 
            maintenanceReportActions.getMaintenanceReportsByType(type, { ...params, skip: page.toString() })
            : maintenanceReportActions.getMaintenanceReports({ ...params, skip: page.toString() }))
                .then((res) => {
                    setMaintenanceReports(res.data.maintenanceReports);
                    setTotalPages(Math.ceil(res.data.count / MAX_ROWS));
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    setListLoading(false);
                });
    }, [page]);

    useEffect(() => {
        let params = {};
        if (userContext?.role === 'ADMIN') {
            params = { location: userContext.location._id };
        }
        if (type) {
            actions[type] && actions[type](params)
                .then((res) => {
                    const {code, message, count, ...devices} = res.data;
                    console.log(res.data, devices[`${type}s`]);
                    const deviceOptionsList = (devices[`${type}s`] as {_id: string, name: string}[]).map(l => ({value: l._id, label: l.name}));
                    setDeviceOptions(deviceOptionsList);
                })
                .catch(error => {
                    console.error(error);
                })
        }
            

    }, []);

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

    const calendarOnChangeHandler = (date: DateObject) => {
        console.log(date.toDate().toISOString());
        setDate(date.toDate().toISOString());
    };

    const modalOnCloseHandler = () => {
        maintenanceReportForm.reset();
        setEditMode(null);
        setViewMode(null);
        close();
    }

    const newMaintenanceReportHandler = () => {
        setEditMode(null);
        open();
    }

    const viewMaintenanceReportHandler = (id: string) => {
        const report = maintenanceReports.find(r => r._id === id);
        if (report) {
            setViewMode(report);
            open();
        }
    }

    const deleteMaintenanceReportHandler = (id: string) => {
        setLoading(true);
        maintenanceReportActions.deleteMaintenanceReport(id)
            .then(_ => {
                setMaintenanceReports(s => {
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

    const editMaintenanceReportHandler = (id: string) => {
            console.log(id);
            const item = maintenanceReports.find(a => a._id === id);
            if (item) {
                console.log(item);
                const { location, device, ...data} = item;
                maintenanceReportForm.setValues({
                    ...data,
                    location: location.toString(),
                    device: device.toString()
                });
                setDate(data.date);
                setEditMode(id);
                open();
            }
    }

    const formOnSubmit = (values: MaintenanceReportForm) => {
        console.log('maintenanceReport submit');
        const selectedDevice = deviceOptions.find(d => d.value === values.device);
        const standardValue = {
            ...values,
            deviceName: selectedDevice?.label || '',
            deviceType: values.deviceType as DeviceType,
            date,
        }

        console.log('form', standardValue);

        setLoading(true);
        if (editMode) {
            maintenanceReportActions.updateMaintenanceReport({_id: editMode, ...standardValue}).then(res => {
                setMaintenanceReports(s => {
                    const updated = [...s];
                    const index = updated.findIndex(a => a._id === editMode);
                    if (index > -1) {
                        updated[index] = {...res.data?.maintenanceReport};
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
            maintenanceReportActions.createMaintenanceReport(standardValue).then(res => {
                setMaintenanceReports(s => {
                    return [...s, {...res.data?.maintenanceReport}];
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
        maintenanceReportActions.getMaintenanceReports({...query})
            .then((res) => {
                setMaintenanceReports(res.data.maintenanceReports);
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
            fields={maintenanceReportSchemaFields}
            viewMode={viewMode}
            close={close}
            closeHandler={modalOnCloseHandler}
            opened={opened}
            title="گزارش تعمیر و سرویس"
            editMode={editMode}>
            <Form form={maintenanceReportForm} onSubmit={formOnSubmit}>
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
                                key={maintenanceReportForm.key('location')}
                                {...maintenanceReportForm.getInputProps('location')}
                            />
                    }
                    {
                            <Select
                                label='دستگاه'
                                placeholder="دستگاه مورد نظر را انتخاب کنید..."
                                data={deviceOptions}
                                key={maintenanceReportForm.key('device')}
                                {...maintenanceReportForm.getInputProps('device')}
                                searchable/>
                    }
                    {
                        renderFormFromSchema(maintenanceReportSchemaFields, maintenanceReportForm)
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
            newItem={newMaintenanceReportHandler}
            reportHandler={() => {}}
            searchHandler={searchHandler}
            title="گزارش" />
        <TableView.TableContainer
            customFieldValue={getCustomFieldValue}
            data={maintenanceReports}
            fields={maintenanceReportSchemaFields}
            isLoading={isListLoading}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            viewItemHandler={viewMaintenanceReportHandler}
            deleteItemHandler={deleteMaintenanceReportHandler}
            editItemHandler={editMaintenanceReportHandler}
            scrollContainer={1200}
            maxRows={MAX_ROWS} />
    </TableView>
}
