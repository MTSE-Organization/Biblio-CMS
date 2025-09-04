import { SidebarLayout } from '@/components/layout';

export default function AccountLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
