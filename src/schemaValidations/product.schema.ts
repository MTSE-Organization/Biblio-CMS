import z from 'zod';

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().nonempty('Bắt buộc'),
  description: z.string().nonempty('Bắt buộc'),
  price: z
    .number({ error: 'Giá phải là số' })
    .nonnegative('Giá không được là số âm'),
  releaseDate: z.string().nonempty('Bắt buộc'),
  ageRating: z.number({ error: 'Độ tuổi phải là số' }),
  language: z.string().nonempty('Bắt buộc'),
  isFeatured: z.boolean({ error: 'Bắt buộc' }),
  discount: z
    .number({ error: 'Giảm giá phải là số' })
    .nonnegative('Giảm giá không được là số âm'),
  categoryId: z.string().nonempty('Bắt buộc'),
  contributorsIds: z.array(z.string()).nonempty('Bắt buộc'),
  publisherId: z.string().nonempty('Bắt buộc'),
  metaData: z.union([
    z.object({
      height: z.number().nonnegative('Chiều cao không được âm'),
      width: z.number().nonnegative('Chiều rộng không được âm'),
      length: z.number().nonnegative('Chiều dài không được âm'),
      weight: z.number().nonnegative('Cân nặng không được âm'),
      numPage: z.number().int().positive('Số trang phải lớn hơn 0')
    }),
    z.string().nonempty('Bắt buộc')
  ])
});

export const productSearchParamSchema = z.object({
  name: z.string().optional().nullable(),
  ageRating: z.number().optional().nullable(),
  language: z.string().optional().nullable(),
  isFeatured: z.boolean().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  publisherId: z.string().optional().nullable(),
  status: z.number().optional().nullable()
});
