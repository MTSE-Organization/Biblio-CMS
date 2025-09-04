import z from 'zod';

export const updateProfileSchema = z.object({
  email: z.string().nonempty('Bắt buộc'),
  fullName: z.string().nonempty('Bắt buộc'),
  avatarPath: z.string().optional(),
  phone: z
    .string()
    .regex(/^0\d{9}$/, 'Số điện thoại không hợp lệ')
    .optional()
});
