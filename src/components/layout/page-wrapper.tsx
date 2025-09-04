import Footer from '@/components/footer';
import { Breadcrumb } from '@/components/form';
import { BreadcrumbType } from '@/types';

export default function PageWrapper({
  children,
  breadcrumbs,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  breadcrumbs: BreadcrumbType[];
}) {
  return (
    <main
      className='bg-page-wrapper h-[calc(100vh_-_64px)] overflow-y-scroll'
      {...props}
    >
      <div className='min-h-[calc(100vh_-_128px)]'>
        <div className='px-5 py-4'>
          <Breadcrumb items={breadcrumbs} />
        </div>
        <div className='px-2 pb-2'>
          <div className='min-h-[calc(100vh_-_190px)] rounded-lg bg-white'>
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
