import { groupSchema } from '@/schemaValidations';
import z from 'zod';

export type GroupResType = {
    id: string;
    name: string;
    description: string;
    kind: number;
    isSystemRole: boolean;
    status: number;
};

export type GroupBodyType = z.infer<typeof groupSchema>;
