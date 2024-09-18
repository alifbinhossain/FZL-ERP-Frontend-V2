import { z } from 'zod';

import {
	NUMBER_DOUBLE_REQUIRED,
	STRING_NULLABLE,
	STRING_REQUIRED,
} from '@/utils/validators';

// TODO: Remove this demo schema and add all the schemas like this
export const TEST_SCHEMA = z.object({
	email: STRING_REQUIRED,
});
export const TEST_NULL = {
	uuid: null,
	email: '',
};
export type ITest = z.infer<typeof TEST_SCHEMA>;

// TODO: Remove this demo schema and add all the schemas like this
export const TEST_STOCK_SCHEMA = (
	{ minStock, maxStock } = { minStock: 0, maxStock: 0 }
) =>
	z.object({
		trx_to: STRING_REQUIRED,
		trx_quantity: NUMBER_DOUBLE_REQUIRED.min(
			minStock,
			`Quantity can't be less than ${minStock}`
		).max(maxStock, `Quantity can't be more than ${maxStock}`),
		remarks: STRING_NULLABLE,
	});

export const TEST_STOCK_NULL = {
	trx_to: '',
	trx_quantity: 0,
	remarks: '',
};
const testStockSchema = TEST_STOCK_SCHEMA();

export type ITestStock = z.infer<typeof testStockSchema>;

// TODO: Remove this demo schema and add all the schemas like this
export const TEST_TRX_AGAINST_ORDER_SCHEMA = (
	{ minStock, maxStock } = { minStock: 0, maxStock: 0 }
) =>
	z.object({
		order_description_uuid: STRING_REQUIRED,
		trx_to: STRING_REQUIRED,
		trx_quantity: NUMBER_DOUBLE_REQUIRED.min(
			minStock,
			`Quantity can't be less than ${minStock}`
		).max(maxStock, `Quantity can't be more than ${maxStock}`),
		remarks: STRING_NULLABLE,
	});

export const TEST_TRX_AGAINST_ORDER_NULL = {
	order_description_uuid: '',
	trx_to: '',
	trx_quantity: 0,
	remarks: '',
};
const testTrxAgainstOrderSchema = TEST_TRX_AGAINST_ORDER_SCHEMA();

export type ITestTrxAgainstOrder = z.infer<typeof testTrxAgainstOrderSchema>;
