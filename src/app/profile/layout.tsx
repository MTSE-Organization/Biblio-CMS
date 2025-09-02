import { SidebarLayout } from '@/components/layout';
import React from 'react';

export default function ProfileLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
