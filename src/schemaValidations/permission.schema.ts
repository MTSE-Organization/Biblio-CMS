import z from 'zod';

export const permissionSchema = z.object({
    id: z.union([z.string(), z.number()]).optional(),
    name: z.string().nonempty('Bắt buộc'),
    description: z.string().nonempty('Bắt buộc'),
    pCode: z.string().nonempty('Bắt buộc'),
    nameGroup: z.string().nonempty('Bắt buộc')
});
