import CategoryForm from '@/app/category/[id]/category-form';

export default function CategoryDetailPage() {
  return <CategoryForm queryKey='category' />;
}
