import { IButtonState } from "@/src/common/type/button.types";
import TableView, { renderFormFromSchema, SelectOption } from "@/src/Components/TableView";
import UserContext from "@/src/Contexts/UserContext";
import { IBlogPopulated } from "@/src/lib/module/common/types";
import { Form, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { MAX_ROWS } from "@/src/Constants";
import { ILocation, locationActions } from "@/src/lib/module/location";
import { blogActions, INewBlog } from '@/src/lib/module/blog';
import { IconCheck, IconExclamationCircle, IconTrash } from "@tabler/icons-react";
import { ActionIcon, Button, Group, Select, Stack, Text } from "@mantine/core";
import { getCustomFieldValue } from "./utils";
import { blogSchemaFields } from "./constants";
import { filters } from "./constants";
import { BlogForm } from "./types";
import { uploadFile } from "@/src/lib/uploader";
import { INewBlogWithFile } from "@/src/lib/module/blog/actions";
import { IBlogFile } from "@/src/lib/module/blog/blog.types";

const LIMIT = MAX_ROWS;

export interface BlogProps {
    location?: string;
    blogs: IBlogPopulated[];
    setBlogs:  Dispatch<SetStateAction<IBlogPopulated[]>>;
}

export default function Blog({
    location,
    blogs,
    setBlogs
}: BlogProps) {
    const userContext = useContext(UserContext);
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [editMode, setEditMode] = useState<string | null>(null);
    const [deleteMode, setDeleteMode] = useState<string | null>(null);
    const [btnState, setBtnState] = useState<IButtonState>({color: undefined, icon: undefined})
    const [viewMode, setViewMode] = useState<IBlogPopulated | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [isListLoading, setListLoading] = useState(true);
    const [locationOptions, setLocationOptions] = useState<SelectOption[]>([]);
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState<IBlogFile>();

    const [opened, {open, close}] = useDisclosure(false);

    const blogForm = useForm<BlogForm>({
        mode: 'controlled',
        initialValues: {
            location: userContext?.location._id || '',
            title: '',
            desc: '',
            authorName: userContext?.firstName + ' ' + userContext?.lastName
        },
    })

    useEffect(() => {
        if (userContext) {
            const filter = userContext.role === 'MANAGER' || userContext.role === 'MANAGER_VIEW_ONLY' ? location : userContext.location._id;
            blogActions.getPosts({ location: filter, skip: page.toString() })
                .then((res) => {
                    setBlogs(res.data.blogs);
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
        blogForm.reset();
        setEditMode(null);
        setViewMode(null);
        setDeleteMode(null);
        close();
    }

    const newblogHandler = () => {
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

    const deleteblogHandler = (id: string) => {
        if (userContext?.role.includes('VIEW_ONLY')) return;
        setLoading(true);
        blogActions.deletePost(id)
            .then(_ => {
                setBlogs(s => {
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
        const blog = blogs.find(r => r._id === id);
        if (blog) {
            setViewMode(blog);
            open();
        }
    }

    const editblogHandler = (id: string) => {
        if (userContext?.role.includes('VIEW_ONLY')) return;
            console.log(id);
            const item = blogs.find(a => a._id === id);
            if (item) {
                console.log(item);
                const { ...data} = item;
                blogForm.setValues({
                    ...data,
                    location: data.location?._id || '',
                });
                setFile(data.file);
                setEditMode(id);
                open();
            }
    }


    const formOnSubmit = async (values: BlogForm) => {
        if (userContext?.role.includes('VIEW_ONLY')) return;
        console.log('blog submit');
        const standardValue = {
            ...values,
            author: userContext?._id || null,
            file: file || null,
        } as INewBlogWithFile;

        console.log('form', standardValue);

        setLoading(true);
        const formElement = document.getElementById('upload-form') as HTMLFormElement;
        const formData = new FormData(formElement);

        let fileResult = { success: false, fileName: '', fileUrl: '' };
        if (formData.get('file')) {
            fileResult = await uploadFile(formData);
            standardValue.newFile = { name: fileResult.fileName, url: fileResult.fileUrl };
        }

        if (editMode) {
            blogActions.updatePost({_id: editMode, ...standardValue}).then(res => {
                setBlogs(s => {
                    const updated = [...s];
                    const index = updated.findIndex(a => a._id === editMode);
                    if (index > -1) {
                        updated[index] = {...res.data?.blog};
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
            blogActions.createPost(standardValue).then(res => {
                setBlogs(s => {
                    return [...s, {...res.data?.blog}];
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
        blogActions.getPosts({...query})
            .then((res) => {
                setBlogs(res.data.blogs);
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

    const fileUploadHandler = async (formData: FormData) => {
        setUploading(true);
        try {
            const result = await uploadFile(formData);
            console.log(`Upload successful! File URL: ${result.fileUrl}`);
        } catch (error: any) {
            console.log(`Error: ${error.message}`);
        } finally {
            setUploading(false);
        }
    }

    return <TableView>
        <TableView.Modal 
            customFieldValue={getCustomFieldValue}
            fields={blogSchemaFields}
            viewMode={viewMode}
            deleteMode={deleteMode}
            deleteItemHandler={deleteblogHandler}
            close={close}
            closeHandler={modalOnCloseHandler}
            opened={opened}
            title="ردیف"
            editMode={editMode}>
            <Form id="upload-form" form={blogForm} onSubmit={formOnSubmit}>
                <Stack gap={'md'}>
                    {
                        userContext?.role === 'MANAGER' &&
                            <Select
                                label='نام مرکز'
                                placeholder="انتخاب کنید"
                                data={locationOptions}
                                key={blogForm.key('location')}
                                {...blogForm.getInputProps('location')}
                            />
                    }
                    {
                        renderFormFromSchema(blogSchemaFields, blogForm)
                    }
                    {
                        file && <Group>
                            <Text>{file.name || file.url}</Text>
                            <ActionIcon variant="transparent" onClick={() => {}}>
                                <IconTrash size={16} />
                            </ActionIcon>
                        </Group>
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
            newItem={newblogHandler}
            reportHandler={() => {}}
            searchHandler={searchHandler}
            reportFields={blogSchemaFields}
            data={blogs}
            title="ردیف" />
        <TableView.TableContainer
            customFieldValue={getCustomFieldValue}
            viewItemHandler={viewMaintenanceReportHandler}
            data={blogs}
            fields={blogSchemaFields}
            isLoading={isListLoading}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            deleteItemHandler={deleteHandler}
            editItemHandler={editblogHandler}
            // scrollContainer={2000}
            maxRows={MAX_ROWS} />
    </TableView>
}
