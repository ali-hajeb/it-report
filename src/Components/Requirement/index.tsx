import { INewRequirement, requirementActions } from "@/src/lib/module/requirement";
import { Button, Select, Stack } from "@mantine/core";
import { Form, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconExclamationCircle } from "@tabler/icons-react";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { IButtonState } from "@/src/common/type/button.types";
import { MAX_ROWS } from "@/src/Constants";
import { RequirementForm } from "./types";
import { requirementSchemaFields, filters, requirementStatusOptions } from "./constants";
import { getCustomFieldValue } from "./utils";
import { IRequirementPopulated } from "@/src/lib/module/common/types";
import UserContext from "@/src/Contexts/UserContext";
import TableView, { renderFormFromSchema, SelectOption } from "@/src/Components/TableView";
import { ILocation, locationActions } from "@/src/lib/module/location";

const LIMIT = MAX_ROWS;

export interface RequirementListProps {
    location?: string;
    requirements: IRequirementPopulated[];
    setRequirements: Dispatch<SetStateAction<IRequirementPopulated[]>>;
}

export default function RequirementList({
    location,
    requirements,
    setRequirements
}: RequirementListProps) {
    const userContext = useContext(UserContext);
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [editMode, setEditMode] = useState<string | null>(null);
    const [deleteMode, setDeleteMode] = useState<string | null>(null);
    const [btnState, setBtnState] = useState<IButtonState>({color: undefined, icon: undefined})
    const [viewMode, setViewMode] = useState<IRequirementPopulated | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [isListLoading, setListLoading] = useState(true);
    const [locationOptions, setLocationOptions] = useState<SelectOption[]>([]);

    const [opened, {open, close}] = useDisclosure(false);

    const requirementForm = useForm<RequirementForm>({
        mode: 'controlled',
        initialValues: {
            location: userContext?.location?._id || '',
            unit: '',
            user: '',
            requirement: '',
            desc: '',
            count: '',
            note: '',
            status: null
        },
    })

    useEffect(() => {
        requirementActions.getRequirements({ location, skip: page.toString() })
            .then((res) => {
                setRequirements(res.data.requirements);
                console.log('rec', res.data.requirements);
                setTotalPages(Math.ceil(res.data.count / LIMIT));
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setListLoading(false)
            });
    }, []);

    useEffect(() => {
        if (userContext?.role === 'MANAGER' || userContext?.role === 'MANAGER_VIEW_ONLY') {
            locationActions.getLocations()
                .then((res) => {
                    const locations = res.data.locations as ILocation[];
                    const locationOptions = locations.map(l => ({value: l._id, label: l.name}));
                    setLocationOptions(locationOptions);
                    console.log('location` opt', locationOptions);
                })
                .catch(error => {
                    console.error(error);
                })
        }
    }, []);

    const modalOnCloseHandler = () => {
        requirementForm.reset();
        setEditMode(null);
        setViewMode(null);
        setDeleteMode(null);
        close();
    }

    const newRequirementHandler = () => {
        if (userContext?.role.includes('VIEW_ONLY')) return;
        setEditMode(null);
        setDeleteMode(null);
        open();
    }

    const deleteHandler = (id: string) => {
        if (userContext?.role.includes('VIEW_ONLY')) return;
        setEditMode(null);
        setDeleteMode(id);
        open();
    }

    const deleteRequirementHandler = (id: string) => {
        if (userContext?.role.includes('VIEW_ONLY')) return;
        setLoading(true);
        requirementActions.deleteRequirement(id)
            .then(_ => {
                setRequirements(s => {
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
        const requirement = requirements.find(r => r._id === id);
        if (requirement) {
            setViewMode(requirement);
            open();
        }
    }

    const editRequirementHandler = (id: string) => {
        if (userContext?.role.includes('VIEW_ONLY')) return;
        const item = requirements.find(a => a._id === id);
        console.log('edit', item);
        if (item) {
            const {count, ...data} = item;
            requirementForm.setValues({
                ...data,
                count: count.toString(),
                location: data.location?._id || '',
            });
            setEditMode(id);
            open();
        }
    }

    const formOnSubmit = (values: RequirementForm) => {
        if (userContext?.role.includes('VIEW_ONLY')) return;
        console.log('requirement submit');
        const standardValue = {
            ...values,
            count: parseInt(values.count),
            status: values.status || 'در حال بررسی',
        } as INewRequirement;

        console.log('form', standardValue);

        setLoading(true);
        if (editMode) {
            requirementActions.updateRequirement({_id: editMode, ...standardValue}).then(res => {
                setRequirements(s => {
                    const updated = [...s];
                    const index = updated.findIndex(a => a._id === editMode);
                    if (index > -1) {
                        updated[index] = {...res.data?.requirement};
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
            requirementActions.createRequirement(standardValue).then(res => {
                setRequirements(s => {
                    return [...s, {...res.data?.requirement}];
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
        requirementActions.getRequirements({...query})
            .then((res) => {
                setRequirements(res.data.requirements);
                setPage(0);
                setTotalPages(Math.ceil(res.data.count / LIMIT));
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
            fields={requirementSchemaFields}
            viewMode={viewMode}
            deleteMode={deleteMode}
            deleteItemHandler={deleteRequirementHandler}
            close={close}
            closeHandler={modalOnCloseHandler}
            opened={opened}
            title="نیاز سنجی"
            editMode={editMode}>
            <Form form={requirementForm} onSubmit={formOnSubmit}>
                <Stack gap={'md'}>
                    {
                        userContext?.role === 'MANAGER' &&
                            <Select
                                label='نام مرکز'
                                placeholder="انتخاب کنید"
                                data={locationOptions}
                                key={requirementForm.key('location')}
                                {...requirementForm.getInputProps('location')}
                            />
                    }
                    {
                        userContext?.role === 'MANAGER' &&
                            <Select
                                label='وضعیت'
                                placeholder="انتخاب کنید"
                                data={requirementStatusOptions}
                                key={requirementForm.key('status')}
                                {...requirementForm.getInputProps('status')}
                            />
                    }
                    {
                        renderFormFromSchema(requirementSchemaFields, requirementForm)
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
            newItem={newRequirementHandler}
            reportHandler={() => {}}
            searchHandler={searchHandler}
            reportFields={requirementSchemaFields}
            data={requirements}
            title="نیاز سنجی" />
        <TableView.TableContainer
            customFieldValue={getCustomFieldValue}
            viewItemHandler={viewMaintenanceReportHandler}
            data={requirements}
            fields={requirementSchemaFields}
            isLoading={isListLoading}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            deleteItemHandler={deleteHandler}
            editItemHandler={editRequirementHandler}
            maxRows={MAX_ROWS} />
    </TableView>
}
