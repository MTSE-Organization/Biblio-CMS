import z from 'zod';

export const productVariantSchema = z.object({
  id: z.string().optional(),
  imageUrl: z.string().nonempty('Bắt buộc'),
  condition: z.number(),
  format: z.number(),
  quantity: z.number().positive('Số lượng phải lớn hơn không'),
  modifiedPrice: z.number().nonnegative('Giá phải lớn hơn không'),
  productId: z.string().nonempty('Bắt buộc').optional()
});

export const productVariantSearchParamSchema = z.object({
  condition: z.number().optional().nullable(),
  format: z.number().optional().nullable(),
  status: z.number().optional().nullable()
});
