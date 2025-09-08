import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageWrapper } from '@/components/layout';
import { GroupList } from '@/app/group-permission/_components';
import PermissionList from '@/app/group-permission/_components/permission-list';
import route from '@/routes';

export default function GroupPermissionPage() {
    return (
        <PageWrapper
            breadcrumbs={[
                { label: 'Trang chủ', href: route.home.path },
                { label: 'Quyền' }
            ]}
        >
            <div className='rounded-lg bg-white'>
                <Tabs defaultValue='tab-3'>
                    <TabsList className='relative h-auto w-full justify-start gap-0.5 bg-transparent p-4 pb-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-zinc-100'>
                        <TabsTrigger
                            value='tab-1'
                            className='data-[state=active]:text-dodger-blue cursor-pointer overflow-hidden rounded-b-none border-x border-t bg-zinc-50 py-2 font-normal text-black data-[state=active]:z-10 data-[state=active]:shadow-none'
                        >
                            Vai trò
                        </TabsTrigger>
                        <TabsTrigger
                            value='tab-2'
                            className='data-[state=active]:text-dodger-blue cursor-pointer overflow-hidden rounded-b-none border-x border-t bg-zinc-50 py-2 font-normal text-black data-[state=active]:z-10 data-[state=active]:shadow-none'
                        >
                            Nhóm quyền
                        </TabsTrigger>
                        <TabsTrigger
                            value='tab-3'
                            className='data-[state=active]:text-dodger-blue cursor-pointer overflow-hidden rounded-b-none border-x border-t bg-zinc-50 py-2 font-normal text-black data-[state=active]:z-10 data-[state=active]:shadow-none'
                        >
                            Quyền
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value='tab-1'>
                        <p className='text-muted-foreground p-4 text-center text-xs'>
                            Content for Tab 1
                        </p>
                    </TabsContent>
                    <TabsContent value='tab-2'>
                        <GroupList />
                    </TabsContent>
                    <TabsContent value='tab-3'>
                        <PermissionList />
                    </TabsContent>
                </Tabs>
            </div>
        </PageWrapper>
    );
}
