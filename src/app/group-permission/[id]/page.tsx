import GroupForm from '@/app/group-permission/[id]/permission-form';
import { PageWrapper } from '@/components/layout';

export default async function GroupDetailPage({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const isCreate = id === 'create';
    return (
        <PageWrapper
            breadcrumbs={[
                { label: 'Trang chủ', href: '/' },
                { label: 'Nhóm quyền', href: '/group-permission' },
                { label: `${isCreate ? 'Thêm mới' : 'Chỉnh sửa'} quyền` }
            ]}
        >
            <GroupForm />
        </PageWrapper>
    );
}
