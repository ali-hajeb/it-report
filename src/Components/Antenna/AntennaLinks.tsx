import { IButtonState } from "@/src/common/type/button.types";
import UserContext from "@/src/Contexts/UserContext";
import { IAntennaLinkPopulated } from "@/src/lib/module/common/types";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import TableView, { renderFormFromSchema, SelectOption } from "@/src/Components/TableView";
import { useDisclosure } from "@mantine/hooks";
import { Form, useForm } from "@mantine/form";
import { AntennaLinkForm } from "./types";
import { antennaActions, IAntenna } from "@/src/lib/module/antenna";
import { MAX_ROWS } from "@/src/Constants";
import { ILocation, locationActions } from "@/src/lib/module/location";
import { IconCheck, IconExclamationCircle } from "@tabler/icons-react";
import { Button, Select, Stack } from "@mantine/core";
import { getAntennaLinkCustomFieldValue } from "./utils";
import { antennaLinkFilters, antennaLinkSchemaFields } from "./constants";

const LIMIT = MAX_ROWS;

export interface AntennaLinksProps {
    location?: string;
    links: IAntennaLinkPopulated[];
    setLinks: Dispatch<SetStateAction<IAntennaLinkPopulated[]>>;
}

export default function AntennaLinks({
    location,
    links,
    setLinks
}: AntennaLinksProps) {
    const userContext = useContext(UserContext);
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [editMode, setEditMode] = useState<string | null>(null);
    const [btnState, setBtnState] = useState<IButtonState>({color: undefined, icon: undefined})
    const [viewMode, setViewMode] = useState<IAntennaLinkPopulated | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [isListLoading, setListLoading] = useState(true);
    const [locationOptions, setLocationOptions] = useState<SelectOption[]>([]);
    const [antennaOptions, setAntennaOptions] = useState<SelectOption[]>([]);

    const [opened, {open, close}] = useDisclosure(false);

    const antennaLinkForm = useForm<AntennaLinkForm>({
        mode: 'controlled',
        initialValues: {
            name: '',
            source: '',
            destination: '',
            distance: '',
            signalIntensity: '',
            linkQuality: '',
            linkType: '',
            bandwidth: '',
            encryption: '',
            status: '',
            notes: '',
            location: userContext?.role === 'ADMIN' ? userContext.location._id : '',
        },
    });

    useEffect(() => {
        console.log(location);
        antennaActions.getAntennaLinks({ location, skip: page.toString() })
            .then((res) => {
                setLinks(res.data.antennaLinks);
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
                });
        }
        
        let params = {};
        if (userContext?.role === 'ADMIN') {
            params = {...params, location: userContext.location._id};
        }
        antennaActions.getAntennas(params)
            .then((res) => {
                const antennas = res.data.antennas as IAntenna[];
                const antennaOptions = antennas.map(l => ({value: l._id, label: l.name}));
                console.log('opt', antennaOptions);
                setAntennaOptions(antennaOptions);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const modalOnCloseHandler = () => {
        antennaLinkForm.reset();
        setEditMode(null);
        setViewMode(null);
        close();
    }

    const newAntennaLinkHandler = () => {
        setEditMode(null);
        open();
    }

    const deleteAntennaLinkHandler = (id: string) => {
        setLoading(true);
        antennaActions.deleteAntennaLink(id)
            .then(_ => {
                setLinks(s => {
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

    const viewAntennaLinkHandler = (id: string) => {
        const antenna = links.find(r => r._id === id);
        if (antenna) {
            setViewMode(antenna);
            open();
        }
    }

    const editAntennaLinkHandler = (id: string) => {
        console.log(id);
        const item = links.find(a => a._id === id);
        if (item) {
            console.log(item);
            const {location, source, destination, ...data} = item;
            antennaLinkForm.setValues({
                ...data,
                distance: data.distance.toString(),
                signalIntensity: data.signalIntensity.toString(),
                linkQuality: data.linkQuality.toString(),
                bandwidth: data.bandwidth.toString(),
                source: source._id,
                destination: destination._id,
                location: location._id,
            });
            setEditMode(id);
            open();
        }
    }


    const formOnSubmit = (values: AntennaLinkForm) => {
        console.log('antenna submit');
        const standardValue = {
            ...values,
            distance: parseFloat(values.distance),
            signalIntensity: parseFloat(values.signalIntensity),
            linkQuality: parseFloat(values.linkQuality),
            bandwidth: parseFloat(values.bandwidth),
        }

        console.log('form', standardValue);

        setLoading(true);
        if (editMode) {
            antennaActions.updateAntennaLink({_id: editMode, ...standardValue}).then(res => {
                setLinks(s => {
                    const updated = [...s];
                    const index = updated.findIndex(a => a._id === editMode);
                    if (index > -1) {
                        updated[index] = {...res.data?.antennaLink};
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
            antennaActions.createAntennaLink(standardValue).then(res => {
                setLinks(s => {
                    return [...s, {...res.data?.antennaLink}];
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
                setLinks(res.data.antennaLinks);
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
            customFieldValue={getAntennaLinkCustomFieldValue}
            fields={antennaLinkSchemaFields}
            viewMode={viewMode}
            close={close}
            closeHandler={modalOnCloseHandler}
            opened={opened}
            title="لینک‌"
            editMode={editMode}>
            <Form form={antennaLinkForm} onSubmit={formOnSubmit}>
                <Stack gap={'md'}>
                    {
                        userContext?.role === 'MANAGER' &&
                            <Select
                                label='نام مرکز'
                                placeholder="انتخاب کنید"
                                data={locationOptions}
                                key={antennaLinkForm.key('location')}
                                {...antennaLinkForm.getInputProps('location')}
                            />
                    }
                    <Select
                        label='آنتن مبدأ'
                        placeholder="دستگاه مورد نظر را انتخاب کنید..."
                        data={antennaOptions}
                        key={antennaLinkForm.key('source')}
                        {...antennaLinkForm.getInputProps('source')}
                        searchable/>

                    <Select
                        label='آنتن مقصد'
                        placeholder="دستگاه مورد نظر را انتخاب کنید..."
                        data={antennaOptions}
                        key={antennaLinkForm.key('destination')}
                        {...antennaLinkForm.getInputProps('destination')}
                        searchable/>
                    {
                        renderFormFromSchema(antennaLinkSchemaFields, antennaLinkForm)
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
            filters={antennaLinkFilters}
            newItem={newAntennaLinkHandler}
            reportHandler={() => {}}
            searchHandler={searchHandler}
            reportFields={antennaLinkSchemaFields}
            data={links}
            title="لینک" />
        <TableView.TableContainer
            customFieldValue={getAntennaLinkCustomFieldValue}
            viewItemHandler={viewAntennaLinkHandler}
            data={links}
            fields={antennaLinkSchemaFields}
            isLoading={isListLoading}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            deleteItemHandler={deleteAntennaLinkHandler}
            editItemHandler={editAntennaLinkHandler}
            scrollContainer={1500}
            maxRows={MAX_ROWS} />
    </TableView>
}
