'use client'
import TableView from '@/src/Components/TableView';
import { ILocation, locationActions } from '@/src/lib/module/location';
import { filters, locationSchemaFields } from './constants';
import { useEffect, useState } from 'react';
import { IButtonState } from '@/src/common/type/button.types';
import { useDisclosure } from '@mantine/hooks';
import { Form, useForm } from '@mantine/form';
import { LocationForm } from './types';
import { IconCheck, IconExclamationCircle } from '@tabler/icons-react';
import { Button, Stack } from '@mantine/core';
import { renderFormFromSchema } from '@/src/Components/TableView';
import { useRouter } from 'next/navigation';
import { MAX_ROWS } from '@/src/Constants';
import { getCustomFieldValue } from './utils';

const LIMIT = MAX_ROWS;

export default function Location() {
    const router = useRouter();
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [editMode, setEditMode] = useState<string | null>(null);
    const [btnState, setBtnState] = useState<IButtonState>({color: undefined, icon: undefined})
    const [isLoading, setLoading] = useState(false);
    const [locations, setLocations] = useState<ILocation[]>([]);
    const [isListLoading, setListLoading] = useState(true);

    const [opened, {open, close}] = useDisclosure(false);

    useEffect(() => {
        locationActions.getLocations({ skip: page.toString(), limit: LIMIT.toString() })
            .then((res) => {
                setLocations(res.data.locations);
                setTotalPages(Math.ceil(res.data.count / LIMIT));
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setListLoading(false)
            });
    }, [page]);

    const locationForm = useForm<LocationForm>({
        mode: 'controlled',
        initialValues: {
            name: '',
            city: '',
            address: '',
        },
    })

    const modalOnCloseHandler = () => {
        locationForm.reset();
        setEditMode(null);
        close();
    }

    const newLocationHandler = () => {
        setEditMode(null);
        open();
    }

    const editLocationHandler = (id: string) => {
        const item = locations.find(a => a._id === id);
        if (item) {
            locationForm.setValues({
                ...item,
            });
            setEditMode(id);
            open();
        }
    }

    const deleteLocationHandler = (id: string) => {
        setLoading(true);
        locationActions.deleteLocation(id)
            .then(res => {
                setLocations(s => {
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

    const viewItemHander = (id: string) => {
        router.push(`/location/${id}`);
    }

    const formOnSubmit = (values: LocationForm) => {
        console.log('location submit');
        const standardValue = {
            ...values,
        }
        setLoading(true);
        if (editMode) {
            locationActions.updateLocation({_id: editMode, ...standardValue}).then(res => {
                setLocations(s => {
                    const updated = [...s];
                    const index = updated.findIndex(a => a._id === editMode);
                    if (index > -1) {
                        updated[index] = {...res.data?.location};
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
            locationActions.createLocation(standardValue).then(res => {
                setLocations(s => {
                    return [...s, {...res.data?.location}];
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
        locationActions.getLocations({...query})
            .then((res) => {
                    setLocations(res.data.locations);
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

    const reportHandler = () => {
    };
    return <TableView>
        <TableView.Modal 
            close={close}
            editMode={editMode}
            opened={opened}
            title='مرکز'
            closeHandler={modalOnCloseHandler}
        >
            <Form form={locationForm} onSubmit={formOnSubmit}>
                <Stack gap={'md'}>
                    {
                        renderFormFromSchema(locationSchemaFields, locationForm)
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
            title='مراکز'
            reportHandler={reportHandler}
            searchHandler={searchHandler}
            newItem={newLocationHandler}
            reportFields={locationSchemaFields}
            data={locations}
            filters={filters}>
        </TableView.TopBar>
        <TableView.TableContainer 
            data={locations}
            isLoading={isListLoading}
            maxRows={LIMIT}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            fields={locationSchemaFields}
            viewItemHandler={viewItemHander}
            deleteItemHandler={deleteLocationHandler}
            editItemHandler={editLocationHandler}
            customFieldValue={getCustomFieldValue}>
        </TableView.TableContainer>
    </TableView>
}

