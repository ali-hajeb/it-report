import { IButtonState } from "@/src/common/type/button.types";
import UserContext from "@/src/Contexts/UserContext";
import { IServerCheckListPopulated, IServerPopulated } from "@/src/lib/module/common/types";
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { SelectOption } from "../TableView";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { ICheckListItem, INewServerCheckList, serverActions } from "@/src/lib/module/server";
import { ILocation, locationActions } from "@/src/lib/module/location";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { IconCalendar, IconCheck, IconExclamationCircle } from "@tabler/icons-react";
import { MAX_ROWS } from "@/src/Constants";
import { ServerCheckListForm } from "./types";
import { Button, Checkbox, Flex, Group, Input, InputWrapper, Modal, Select, Table, Text } from "@mantine/core";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { CHECKLIST } from "@/src/Constants/checklist";

const LIMIT = MAX_ROWS;

export interface ServerCheckListProps {
    location?: string;
    serverCheckList: IServerCheckListPopulated[];
    setServerCheckList: Dispatch<SetStateAction<IServerCheckListPopulated[]>>;
}

export default function ServerCheckList({
    location, serverCheckList, setServerCheckList
}: ServerCheckListProps) {
    const userContext = useContext(UserContext);
    const [date, setDate] = useState<string>(new Date().toISOString());
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [editMode, setEditMode] = useState<string | null>(null);
    const [btnState, setBtnState] = useState<IButtonState>({color: undefined, icon: undefined})
    const [viewMode, setViewMode] = useState<IServerCheckListPopulated | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [isListLoading, setListLoading] = useState(true);
    const [locationOptions, setLocationOptions] = useState<SelectOption[]>([]);
    const [serverOptions, setserverOptions] = useState<SelectOption[]>([]);
    const [checkListItems, setCheckListItems] = useState<ICheckListItem[]>([]);

    const [opened, {open, close}] = useDisclosure(false);

    const serverCheckListForm = useForm<ServerCheckListForm>({
        mode: 'controlled',
        initialValues: {
            date: '',
            // server: '',
            // serverName: '',
            location: '',
        },
    })

    useEffect(() => {
        serverActions.getServersCheckList({ location, skip: page.toString() })
            .then((res) => {
                setServerCheckList(res.data.ServerCheckLists);
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
        serverActions.getServers(params)
            .then((res) => {
                const servers = res.data.servers as IServerPopulated[];
                const serverOptions = servers.map(l => ({value: l._id, label: l.name}));
                console.log('opt', serverOptions);
                setserverOptions(serverOptions);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const modalOnCloseHandler = () => {
        serverCheckListForm.reset();
        setEditMode(null);
        setViewMode(null);
        close();
    }

    const newServerCheckListHandler = () => {
        setEditMode(null);
        open();
    }

    const deleteServerCheckListHandler = (id: string) => {
        setLoading(true);
        serverActions.deleteServerCheckList(id)
            .then(_ => {
                setServerCheckList(s => {
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
        const ServerCheckList = serverCheckList.find(r => r._id === id);
        if (ServerCheckList) {
            setViewMode(ServerCheckList);
            open();
        }
    }

    const editServerCheckListHandler = (id: string) => {
        console.log(id);
        const item = serverCheckList.find(a => a._id === id);
        if (item) {
            console.log(item);
            const { date, server, ...data} = item;
            serverCheckListForm.setValues({
                ...data,
                // server: server._id,
                location: data.location._id,
            });
            date && setDate(date);
            setEditMode(id);
            open();
        }
    }


    const calendarServerCheckListOnChangeHandler = (date: DateObject) => {
        console.log(date.toDate().toISOString());
        setDate(date.toDate().toISOString());
    };

    const formOnSubmit = (values: ServerCheckListForm) => {
        console.log('ServerCheckList submit');
        // const selectedDevice = serverOptions.find(d => d.value === values.server);
        const standardValue = {
            ...values,
            checkList: checkListItems
        } as INewServerCheckList;

        console.log('form', standardValue);

        setLoading(true);
        if (editMode) {
            serverActions.updateServerCheckList({_id: editMode, ...standardValue}).then(res => {
                setServerCheckList(s => {
                    const updated = [...s];
                    const index = updated.findIndex(a => a._id === editMode);
                    if (index > -1) {
                        updated[index] = {...res.data?.ServerCheckList};
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
            serverActions.createServerCheckList(standardValue).then(res => {
                setServerCheckList(s => {
                    return [...s, {...res.data?.ServerCheckList}];
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
        serverActions.getServersCheckList({...query})
            .then((res) => {
                setServerCheckList(res.data.ServerCheckLists);
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
    return <>
        <Modal
            opened={opened} 
            onClose={modalOnCloseHandler}
            title={'افزودن'}>
            <InputWrapper label='تاریخ بازرسی'>
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
                    onChange={calendarServerCheckListOnChangeHandler}
                    calendarPosition="center" />
            </InputWrapper>
            {
                userContext?.role === 'MANAGER' &&
                    <Select
                        label='نام مرکز'
                        placeholder="انتخاب کنید"
                        data={locationOptions}
                        key={serverCheckListForm.key('location')}
                        {...serverCheckListForm.getInputProps('location')}
                    />
            }
            {
                CHECKLIST.map((item, i) => <React.Fragment key={i}>
                    <Text>{item.title}</Text>
                    <Checkbox></Checkbox>
                </React.Fragment>)
            }
        </Modal>
        <Flex>
            <Button onClick={() => {}}>افزودن</Button>
            <div>
                <InputWrapper label='انتخاب تاریخ'>
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
                        onChange={calendarServerCheckListOnChangeHandler}
                        calendarPosition="center" />
                </InputWrapper>
            </div>
        </Flex>
    </>
}
