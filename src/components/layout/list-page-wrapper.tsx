export default function ListPageWrapper({
    children,
    searchForm,
    actionBar
}: {
    children: React.ReactNode;
    searchForm?: React.ReactNode;
    actionBar?: React.ReactNode;
}) {
    return (
        <div className='min-h-[calc(100vh_-_190px)] rounded-lg bg-white'>
            <div className='flex items-center justify-between rounded-tl-lg rounded-tr-lg bg-white px-4 py-1'>
                {searchForm && <div className='flex-1'>{searchForm}</div>}
                {actionBar}
            </div>
            {children}
        </div>
    );
}
