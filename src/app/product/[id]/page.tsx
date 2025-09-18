import ProductForm from '@/app/product/[id]/product-form';

export default async function ProductDetailPage() {
  return <ProductForm queryKey='product' />;
}
