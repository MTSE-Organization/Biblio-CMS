import { groupSearchParamSchema } from '@/schemaValidations';
import z from 'zod';

export type BaseSearchParamType = {
    page?: number;
    size?: number;
};
export type GroupSearchParamType = z.infer<typeof groupSearchParamSchema> &
    BaseSearchParamType;
export type PermissionSearchParamType = BaseSearchParamType;
