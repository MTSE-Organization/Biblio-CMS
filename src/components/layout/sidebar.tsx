import Navbar from '@/components/navbar';
import AppSidebar from '@/components/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function SidebarLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '20rem',
          '--sidebar-width-icon': '5rem'
        } as React.CSSProperties
      }
      defaultOpen={true}
    >
      <AppSidebar />
      <div className='w-full overflow-y-hidden bg-gray-100'>
        <Navbar />
        {children}
      </div>
    </SidebarProvider>
  );
}
