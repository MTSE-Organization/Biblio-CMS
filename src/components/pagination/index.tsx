'use client';

import { cn } from '@/lib';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

type PaginationProps = {
  totalPages: number;
};

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const params = useSearchParams();
  const currentPage = Number(params.get('page') ?? 1);

  const createPageLink = (page: number) => {
    if (page === 1) return pathname;
    const newParams = new URLSearchParams(params.toString());
    newParams.set('page', String(page));
    return `${pathname}?${newParams.toString()}`;
  };

  if (totalPages <= 1) return null;

  const renderPage = (page: number) => {
    const isActive = page === currentPage;
    return isActive ? (
      <span
        key={page}
        className={cn(
          'bg-background text-sidebar-item-active border-sidebar-item-active flex h-8 w-8 cursor-pointer items-center justify-center rounded border font-medium'
        )}
      >
        {page}
      </span>
    ) : (
      <Link
        key={page}
        href={createPageLink(page)}
        className={cn(
          'hover:bg-muted flex h-8 w-8 items-center justify-center rounded bg-white'
        )}
      >
        {page}
      </Link>
    );
  };

  const getVisiblePages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        '...',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      ];
    }

    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages
    ];
  };

  const pages = getVisiblePages();

  return (
    <div className='mt-2 mb-5 flex w-full items-center justify-end gap-2 pr-5 text-sm'>
      {currentPage > 1 ? (
        <Link
          href={createPageLink(currentPage - 1)}
          className='hover:bg-muted flex h-8 w-8 items-center justify-center rounded bg-white'
        >
          <ChevronLeft />
        </Link>
      ) : (
        <span className='flex h-8 w-8 items-center justify-center rounded opacity-50'>
          <ChevronLeft />
        </span>
      )}

      {pages.map((p, i) =>
        p === '...' ? (
          <span
            key={`dots-${i}`}
            className='text-muted-foreground flex h-8 w-8 items-center justify-center'
          >
            …
          </span>
        ) : (
          renderPage(p as number)
        )
      )}

      {currentPage < totalPages ? (
        <Link
          href={createPageLink(currentPage + 1)}
          className='hover:bg-muted flex h-8 w-8 items-center justify-center rounded bg-white'
        >
          <ChevronRight />
        </Link>
      ) : (
        <span className='flex h-8 w-8 items-center justify-center rounded opacity-50'>
          <ChevronRight />
        </span>
      )}
    </div>
  );
}
