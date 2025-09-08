'use client';
import {
    AutoCompleteField,
    Button,
    Col,
    InputField,
    Row,
    TextAreaField
} from '@/components/form';
import { BaseForm } from '@/components/form/base-form';
import { CircleLoading } from '@/components/loading';
import { groupErrorMaps, groupKinds } from '@/constants';
import { useNavigate } from '@/hooks';
import { logger } from '@/logger';
import {
    useCreateGroupMutation,
    useGroupQuery,
    useUpdateGroupMutation
} from '@/queries';
import route from '@/routes';
import { groupSchema } from '@/schemaValidations';
import { GroupBodyType } from '@/types';
import { applyFormErrors, notify } from '@/utils';
import { omit } from 'lodash';
import { Save } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

export default function GroupForm() {
    const [isFormChanged, setIsFormChanged] = useState(false);
    const { id } = useParams<{ id: string }>();
    const isCreate = id === 'create';
    const groupQuery = useGroupQuery(id);
    const group = groupQuery.data?.data;
    const createGroupMutation = useCreateGroupMutation();
    const updateGroupMutation = useUpdateGroupMutation(id);
    const navigate = useNavigate();
    const defaultValues: GroupBodyType = {
        kind: 1,
        name: '',
        permissionIds: [],
        description: ''
    };

    const initialValues: GroupBodyType | undefined = useMemo(() => {
        if (!group) return undefined;
        return {
            ...defaultValues,
            ...group
        };
    }, [group]);

    const onSubmit = async (
        values: GroupBodyType,
        form: UseFormReturn<GroupBodyType>
    ) => {
        const mutation = isCreate ? createGroupMutation : updateGroupMutation;
        await mutation.mutateAsync(
            isCreate ? values : { ...omit(values, ['kind']), id },
            {
                onSuccess: (res) => {
                    if (res.result) {
                        notify.success(
                            `${isCreate ? 'Thêm mới' : 'Cập nhật'} nhóm quyền thành công`
                        );
                        navigate(route.group.path);
                    } else {
                        const errCode = res.code;
                        if (errCode) {
                            applyFormErrors(form, errCode, groupErrorMaps);
                        } else {
                            logger.error(
                                'Error while create/update group permission:',
                                res
                            );
                            notify.error('Có lỗi xảy ra');
                        }
                    }
                },
                onError: (error) => {
                    logger.error(
                        'Error while creating/updating group permission:',
                        error
                    );
                    notify.error('Có lỗi xảy ra');
                }
            }
        );
    };

    return (
        <BaseForm
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            schema={groupSchema}
            className='w-200 rounded-lg bg-white p-4'
            onChange={() => setIsFormChanged(true)}
            initialValues={initialValues}
        >
            {(form) => (
                <>
                    <Row>
                        <Col span={12}>
                            <InputField
                                control={form.control}
                                name='name'
                                label='Tên nhóm'
                                placeholder='Nhập tên nhóm'
                                required
                                className='focus-visible:ring-dodger-blue'
                            />
                        </Col>
                        {isCreate && (
                            <Col span={12}>
                                <AutoCompleteField
                                    getLabel={(option) => option.label}
                                    getValue={(option) => option.value}
                                    options={groupKinds}
                                    control={form.control}
                                    name='kind'
                                    label='Loại'
                                    placeholder='Chọn loại'
                                    required
                                    onValueChange={() => setIsFormChanged(true)}
                                />
                            </Col>
                        )}
                    </Row>
                    <Row>
                        <Col>
                            <TextAreaField
                                control={form.control}
                                name='description'
                                label='Mô tả'
                                placeholder='Nhập mô tả'
                                rows={5}
                                className='focus-visible:ring-dodger-blue'
                                required
                            />
                        </Col>
                    </Row>
                    <Row className='my-0 justify-end'>
                        <Col span={4}>
                            <Button
                                type='button'
                                variant={'ghost'}
                                className='border border-red-500 text-red-500 hover:border-red-500/50 hover:bg-transparent! hover:text-red-500/50'
                            >
                                Hủy
                            </Button>
                        </Col>
                        <Col span={4}>
                            <Button
                                disabled={!isFormChanged}
                                type='submit'
                                className={
                                    'bg-dodger-blue hover:bg-dodger-blue hover:opacity-80 disabled:pointer-events-auto disabled:cursor-not-allowed'
                                }
                            >
                                {createGroupMutation.isPending ||
                                updateGroupMutation.isPending ? (
                                    <CircleLoading />
                                ) : (
                                    <>
                                        <Save />
                                        {isCreate ? 'Thêm' : 'Cập nhật'}
                                    </>
                                )}
                            </Button>
                        </Col>
                    </Row>
                </>
            )}
        </BaseForm>
    );
}
