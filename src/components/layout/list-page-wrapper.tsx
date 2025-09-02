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
    <>
      <div className='flex items-center justify-between px-4 py-1'>
        {searchForm && <div className='flex-1'>{searchForm}</div>}
        {actionBar}
      </div>
      {children}
    </>
  );
}
