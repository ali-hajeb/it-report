import { IButtonState } from "@/src/common/type/button.types";
import TableView, { renderFormFromSchema, SelectOption } from "@/src/Components/TableView";
import UserContext from "@/src/Contexts/UserContext";
import { IAssetPopulated } from "@/src/lib/module/common/types";
import { Form, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { MAX_ROWS } from "@/src/Constants";
import { ILocation, locationActions } from "@/src/lib/module/location";
import { assetActions, INewAsset } from '@/src/lib/module/asset';
import { IconCalendar, IconCheck, IconExclamationCircle } from "@tabler/icons-react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Button, Group, Input, InputWrapper, Select, Stack } from "@mantine/core";
import { getCustomFieldValue } from "./utils";
import { assetSchemaFields } from "./constants";
import { filters } from "./constants";
import { AssetForm } from "./types";

const LIMIT = MAX_ROWS;

export interface AssetProps {
    location?: string;
    assets: IAssetPopulated[];
    setAssets:  Dispatch<SetStateAction<IAssetPopulated[]>>;
}

export default function Asset({
    location,
    assets,
    setAssets
}: AssetProps) {
    const userContext = useContext(UserContext);
    const [lastUpdate, setLastUpdate] = useState<string>(new Date().toISOString());
    const [assetLaunchDate, setLaunchDate] = useState<string>(new Date().toISOString());
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [editMode, setEditMode] = useState<string | null>(null);
    const [btnState, setBtnState] = useState<IButtonState>({color: undefined, icon: undefined})
    const [viewMode, setViewMode] = useState<IAssetPopulated | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [isListLoading, setListLoading] = useState(true);
    const [locationOptions, setLocationOptions] = useState<SelectOption[]>([]);

    const [opened, {open, close}] = useDisclosure(false);

    const assetForm = useForm<AssetForm>({
        mode: 'controlled',
        initialValues: {
            location: userContext?.location._id || '',
            unit: '',
            operator: '',
            user: '',
            case: '',
            caseStatus: '',
            caseType: '',
            monitor: '',
            monitorStatus: '',
            cmDifference: '',
            laptop: '',
            laptopModel: '',
            laptopStatus: '',
            tablet: '',
            tabletModel: '',
            tabletStatus: '',
            mobile: '',
            mobileStatus: '',
            printer: '',
            printerType: '',
            printerModel: '',
            scanner: '',
            scannerModel: '',
            scannerType: '',
            barcodeReader: '',
            token: '',
            antivirus: '',
            os: '',
            desc: '',
        },
    })

    useEffect(() => {
        assetActions.getAssets({ location, skip: page.toString() })
            .then((res) => {
                setAssets(res.data.assets);
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

    const modalOnCloseHandler = () => {
        assetForm.reset();
        setEditMode(null);
        setViewMode(null);
        close();
    }

    const newassetHandler = () => {
        setEditMode(null);
        open();
    }

    const deleteassetHandler = (id: string) => {
        setLoading(true);
        assetActions.deleteAsset(id)
            .then(_ => {
                setAssets(s => {
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
        const asset = assets.find(r => r._id === id);
        if (asset) {
            setViewMode(asset);
            open();
        }
    }

    const editassetHandler = (id: string) => {
            console.log(id);
            const item = assets.find(a => a._id === id);
            if (item) {
                console.log(item);
                const { ...data} = item;
                assetForm.setValues({
                    ...data,
                    location: data.location._id,
                });
                setEditMode(id);
                open();
            }
    }


    const formOnSubmit = (values: AssetForm) => {
        console.log('asset submit');
        const standardValue = {
            ...values,
            caseStatus: values.caseStatus || 'N/A',
            monitorStatus: values.monitorStatus || 'N/A',
            mobileStatus: values.mobileStatus || 'N/A',
            laptopStatus: values.laptopStatus || 'N/A',
            tabletStatus: values.tabletStatus || 'N/A',
        } as INewAsset;

        console.log('form', standardValue);

        setLoading(true);
        if (editMode) {
            assetActions.updateAsset({_id: editMode, ...standardValue}).then(res => {
                setAssets(s => {
                    const updated = [...s];
                    const index = updated.findIndex(a => a._id === editMode);
                    if (index > -1) {
                        updated[index] = {...res.data?.asset};
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
            assetActions.createAsset(standardValue).then(res => {
                setAssets(s => {
                    return [...s, {...res.data?.asset}];
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
        assetActions.getAssets({...query})
            .then((res) => {
                setAssets(res.data.assets);
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
            fields={assetSchemaFields}
            viewMode={viewMode}
            close={close}
            closeHandler={modalOnCloseHandler}
            opened={opened}
            title="ردیف"
            editMode={editMode}>
            <Form form={assetForm} onSubmit={formOnSubmit}>
                <Stack gap={'md'}>
                    {
                        userContext?.role === 'MANAGER' &&
                            <Select
                                label='نام مرکز'
                                placeholder="انتخاب کنید"
                                data={locationOptions}
                                key={assetForm.key('location')}
                                {...assetForm.getInputProps('location')}
                            />
                    }
                    {
                        renderFormFromSchema(assetSchemaFields, assetForm)
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
            newItem={newassetHandler}
            reportHandler={() => {}}
            searchHandler={searchHandler}
            reportFields={assetSchemaFields}
            data={assets}
            title="ردیف" />
        <TableView.TableContainer
            customFieldValue={getCustomFieldValue}
            viewItemHandler={viewMaintenanceReportHandler}
            data={assets}
            fields={assetSchemaFields}
            isLoading={isListLoading}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            deleteItemHandler={deleteassetHandler}
            editItemHandler={editassetHandler}
            scrollContainer={2000}
            maxRows={MAX_ROWS} />
    </TableView>
}
