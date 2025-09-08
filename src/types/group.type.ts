import { groupSchema, groupSearchParamSchema } from '@/schemaValidations';
import { BaseSearchParamType } from '@/types/search.type';
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

export type GroupSearchParamType = z.infer<typeof groupSearchParamSchema> &
    BaseSearchParamType;
