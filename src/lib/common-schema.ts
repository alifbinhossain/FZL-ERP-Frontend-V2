import { z } from 'zod';

import {
	NUMBER_DOUBLE_NULLABLE,
	NUMBER_DOUBLE_REQUIRED,
	NUMBER_REQUIRED,
	STRING_NULLABLE,
	STRING_REQUIRED,
} from '@/utils/validators';

// Material Order Against Edit Schema
export const RM_MATERIAL_ORDER_AGAINST_EDIT_SCHEMA = z.object({
	trx_quantity: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const RM_MATERIAL_ORDER_AGAINST_EDIT_NULL: Partial<IRMMaterialOrderAgainstEdit> =
	{
		remarks: '',
	};

export type IRMMaterialOrderAgainstEdit = z.infer<
	typeof RM_MATERIAL_ORDER_AGAINST_EDIT_SCHEMA
>;

// Material Used Edit Schema
export const RM_MATERIAL_USED_EDIT_SCHEMA = z.object({
	used_quantity: NUMBER_DOUBLE_REQUIRED,
	wastage: NUMBER_DOUBLE_NULLABLE,
	remarks: STRING_NULLABLE,
});

export const RM_MATERIAL_USED_EDIT_NULL: Partial<IRMMaterialUsedEdit> = {
	wastage: 0,
	remarks: '',
};

export type IRMMaterialUsedEdit = z.infer<typeof RM_MATERIAL_USED_EDIT_SCHEMA>;

// Material Used Schema
export const RM_MATERIAL_USED_SCHEMA = z.object({
	remaining: NUMBER_DOUBLE_REQUIRED,
	wastage: NUMBER_DOUBLE_NULLABLE,
	remarks: STRING_NULLABLE,
});

export const RM_MATERIAL_USED_NULL: Partial<IRMMaterialUsed> = {
	wastage: 0,
	remarks: '',
};

export type IRMMaterialUsed = z.infer<typeof RM_MATERIAL_USED_SCHEMA>;

// SFG Transfer Log Schema
export const SFG_TRANSFER_LOG_SCHEMA = z.object({
	trx_to: STRING_REQUIRED,
	trx_quantity: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const SFG_TRANSFER_LOG_NULL: Partial<ISFGTransferLog> = {
	remarks: null,
};

export type ISFGTransferLog = z.infer<typeof SFG_TRANSFER_LOG_SCHEMA>;

// SFG Production Log Schema
export const SFG_PRODUCTION_LOG_SCHEMA = z.object({
	production_quantity: NUMBER_REQUIRED.gt(0, 'More than 0'),
	production_quantity_in_kg: NUMBER_DOUBLE_REQUIRED.gt(0, 'More than 0'),
	// wastage: NUMBER_DOUBLE.min(0, 'Minimum of 0')
	// 	.nullable()
	// 	.transform((value, originalValue) =>
	// 		String(originalValue).trim() === '' ? 0 : value
	// 	),
	wastage: NUMBER_DOUBLE_REQUIRED, // TODO: Fix this
	remarks: STRING_NULLABLE,
});

export const SFG_PRODUCTION_LOG_NULL: Partial<ISFGProductionLog> = {
	remarks: null,
};

export type ISFGProductionLog = z.infer<typeof SFG_PRODUCTION_LOG_SCHEMA>;
