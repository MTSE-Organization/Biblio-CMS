import { SidebarLayout } from '@/components/layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quyền'
};

export default function PermissionLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
