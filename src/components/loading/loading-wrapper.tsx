'use client';

import { useProfileStore } from '@/store';
import { Loader } from 'lucide-react';

export default function LoadingWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  const { profile } = useProfileStore();
  const loading = !profile;
  return loading ? (
    <div className='flex h-dvh w-full items-center justify-center'>
      <div>
        <Loader className='size-8! animate-spin' />
      </div>
    </div>
  ) : (
    children
  );
}
