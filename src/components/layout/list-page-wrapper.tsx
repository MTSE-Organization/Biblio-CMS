import { cn } from '@/lib';

export default function ListPageWrapper({
  className,
  children,
  searchForm,
  actionBar
}: {
  className?: string;
  children?: React.ReactNode;
  searchForm?: React.ReactNode;
  actionBar?: React.ReactNode;
}) {
  return (
    <div
      tabIndex={-1}
      className={cn(
        'min-h-[calc(100vh_-_190px)] rounded-lg bg-white',
        className
      )}
    >
      <div className='flex items-center justify-between rounded-tl-lg rounded-tr-lg bg-white px-4'>
        {searchForm && <div className='flex-1'>{searchForm}</div>}
        {actionBar && (
          <div
            className={cn({
              'my-4 ml-auto block': !searchForm
            })}
          >
            {actionBar}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
