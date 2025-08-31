import Container from '@/components/layout/container';
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
      <Container className='w-full bg-gray-100'>
        <Navbar />
        {children}
      </Container>
    </SidebarProvider>
  );
}
