import { permissionSchema } from '@/schemaValidations';
import z from 'zod';

export type PermissionResType = {
    id: string;
    name: string;
    description: string;
    pCode: string;
    nameGroup: string;
    createdDate: Date;
    modifiedDate: Date;
    status: number;
};

export type PermissionBodyType = z.infer<typeof permissionSchema>;
