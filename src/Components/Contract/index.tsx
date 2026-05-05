import { IButtonState } from "@/src/common/type/button.types";
import TableView, { renderFormFromSchema, SelectOption } from "@/src/Components/TableView";
import UserContext from "@/src/Contexts/UserContext";
import { Form, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { MAX_ROWS } from "@/src/Constants";
import { ILocation, locationActions } from "@/src/lib/module/location";
import { contractActions, INewContract } from '@/src/lib/module/contracts';
import { IconCheck, IconExclamationCircle } from "@tabler/icons-react";
import { Button, Stack } from "@mantine/core";
import { getCustomFieldValue } from "./utils";
import { contractSchemaFields } from "./constants";
import { filters } from "./constants";
import { ContractForm } from "./types";
import IContract from "@/src/lib/module/contracts/contract.types";

const LIMIT = MAX_ROWS;

export interface ContractProps {
    location?: string;
    contracts: IContract[];
    setContracts:  Dispatch<SetStateAction<IContract[]>>;
}

export default function Contract({
    location,
    contracts,
    setContracts
}: ContractProps) {
    const userContext = useContext(UserContext);
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [editMode, setEditMode] = useState<string | null>(null);
    const [deleteMode, setDeleteMode] = useState<string | null>(null);
    const [btnState, setBtnState] = useState<IButtonState>({color: undefined, icon: undefined})
    const [viewMode, setViewMode] = useState<IContract | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [isListLoading, setListLoading] = useState(true);
    const [locationOptions, setLocationOptions] = useState<SelectOption[]>([]);

    const [opened, {open, close}] = useDisclosure(false);

    const contractForm = useForm<ContractForm>({
        mode: 'controlled',
        initialValues: {
            companyName: '',
            softwareName: '',
            softwareCategory: '',
            unit: '',
            type: '',
        },
    })

    useEffect(() => {
        if (userContext) {
            const filter = userContext.role === 'MANAGER' || userContext.role === 'MANAGER_VIEW_ONLY' ? location : userContext.location._id;
            contractActions.getContracts({ location: filter, skip: page.toString(), sort: '{ "unit": -1}' })
                .then((res) => {
                    setContracts(res.data.contracts);
                    setTotalPages(Math.ceil(res.data.count / LIMIT));
                })
                .catch(error => {
                    console.error(error);
                })
                .finally(() => {
                    setListLoading(false)
                });
        }
    }, []);

    useEffect(() => {
        if (userContext?.role === 'MANAGER' || userContext?.role === 'MANAGER_VIEW_ONLY') {
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

    const modalOnCloseHandler = () => {
        contractForm.reset();
        setEditMode(null);
        setViewMode(null);
        setDeleteMode(null);
        close();
    }

    const newcontractHandler = () => {

        console.log('Locked', userContext?.role);
        if (userContext?.role.includes('VIEW_ONLY')) {
            return;
        }
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

    const deletecontractHandler = (id: string) => {
        if (userContext?.role.includes('VIEW_ONLY')) return;
        setLoading(true);
        contractActions.deleteContract(id)
            .then(_ => {
                setContracts(s => {
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
        const contract = contracts.find(r => r._id === id);
        if (contract) {
            setViewMode(contract);
            open();
        }
    }

    const editcontractHandler = (id: string) => {
        if (userContext?.role.includes('VIEW_ONLY')) return;
            console.log(id);
            const item = contracts.find(a => a._id === id);
            if (item) {
                console.log(item);
                const { ...data} = item;
                contractForm.setValues({
                    ...data,
                });
                setEditMode(id);
                open();
            }
    }


    const formOnSubmit = (values: ContractForm) => {
        if (userContext?.role.includes('VIEW_ONLY')) return;
        console.log('contract submit');
        const standardValue = {
            ...values,
        } as INewContract;

        console.log('form', standardValue);

        setLoading(true);
        if (editMode) {
            contractActions.updateContract({_id: editMode, ...standardValue}).then(res => {
                setContracts(s => {
                    const updated = [...s];
                    const index = updated.findIndex(a => a._id === editMode);
                    if (index > -1) {
                        updated[index] = {...res.data?.contract};
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
            contractActions.createContract(standardValue).then(res => {
                setContracts(s => {
                    return [...s, {...res.data?.contract}];
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
        contractActions.getContracts({...query})
            .then((res) => {
                setContracts(res.data.contracts);
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
            fields={contractSchemaFields}
            viewMode={viewMode}
            deleteMode={deleteMode}
            deleteItemHandler={deletecontractHandler}
            close={close}
            closeHandler={modalOnCloseHandler}
            opened={opened}
            title="ردیف"
            editMode={editMode}>
            <Form form={contractForm} onSubmit={formOnSubmit}>
                <Stack gap={'md'}>
                    {
                        renderFormFromSchema(contractSchemaFields, contractForm)
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
            newItem={newcontractHandler}
            reportHandler={() => {}}
            searchHandler={searchHandler}
            reportFields={contractSchemaFields}
            data={contracts}
            title="ردیف" />
        <TableView.TableContainer
            customFieldValue={getCustomFieldValue}
            viewItemHandler={viewMaintenanceReportHandler}
            data={contracts}
            fields={contractSchemaFields}
            isLoading={isListLoading}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            deleteItemHandler={deleteHandler}
            editItemHandler={editcontractHandler}
            // scrollContainer={2000}
            maxRows={MAX_ROWS} />
    </TableView>
}
