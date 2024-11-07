/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from 'zod';

import {
	EMAIL_NULLABLE,
	NAME_REQUIRED,
	NUMBER_DOUBLE_OPTIONAL,
	NUMBER_DOUBLE_REQUIRED,
	NUMBER_REQUIRED,
	PHONE_NUMBER_NULLABLE,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

// Material
export const MATERIAL_SCHEMA = z.object({
	section_uuid: STRING_REQUIRED,
	type_uuid: STRING_REQUIRED,
	name: STRING_REQUIRED,
	unit: STRING_REQUIRED,
	short_name: STRING_NULLABLE,
	threshold: NUMBER_DOUBLE_OPTIONAL,
	description: STRING_NULLABLE,
	remarks: STRING_NULLABLE,
});
export const MATERIAL_NULL = {
	uuid: null,
	name: '',
	short_name: '',
	unit: 'kg',
	threshold: 0,
	description: '',
	section_uuid: '',
	type_uuid: '',
	remarks: '',
};
export type IMaterial = z.infer<typeof MATERIAL_SCHEMA>;

// Material Trx Against Order

export const MATERIAL_TRX_AGAINST_ORDER_SCHEMA = ({ minStock, maxStock } = { minStock: 0, maxStock: 0 }) =>
	z.object({
		order_description_uuid: STRING_REQUIRED,
		trx_to: STRING_REQUIRED,
		trx_quantity: NUMBER_DOUBLE_REQUIRED.min(minStock, `Quantity can't be less than ${minStock}`).max(
			maxStock,
			`Quantity can't be more than ${maxStock}`
		),
		remarks: STRING_NULLABLE,
	});

const materialTrxAgainstOrderSchema = MATERIAL_TRX_AGAINST_ORDER_SCHEMA();

export const MATERIAL_TRX_AGAINST_ORDER_NULL = {
	order_description_uuid: '',
	trx_to: '',
	trx_quantity: 0,
	remarks: '',
};
export type IMaterialTrxAgainstOrder = z.infer<typeof materialTrxAgainstOrderSchema>;

// Material Stock
export const MATERIAL_STOCK_SCHEMA = ({ minStock, maxStock } = { minStock: 0, maxStock: 0 }) =>
	z.object({
		trx_to: STRING_REQUIRED,
		trx_quantity: NUMBER_DOUBLE_REQUIRED.min(minStock, `Quantity can't be less than ${minStock}`).max(
			maxStock,
			`Quantity can't be more than ${maxStock}`
		),
		remarks: STRING_NULLABLE,
	});

const materialStockSchema = MATERIAL_STOCK_SCHEMA();

export const MATERIAL_STOCK_NULL = {
	trx_to: '',
	trx_quantity: 0,
	remarks: '',
};
export type IMaterialStock = z.infer<typeof materialStockSchema>;

// Section
export const SECTION_SCHEMA = z.object({
	name: STRING_REQUIRED,
	short_name: STRING_NULLABLE,
	remarks: STRING_NULLABLE,
});
export const SECTION_NULL: Partial<ISection> = {
	name: '',
	short_name: '',
	remarks: '',
};
export type ISection = z.infer<typeof SECTION_SCHEMA>;

// Vendor
export const VENDOR_SCHEMA = z.object({
	name: NAME_REQUIRED,
	contact_name: STRING_NULLABLE,
	contact_number: PHONE_NUMBER_NULLABLE,
	email: EMAIL_NULLABLE,
	office_address: STRING_NULLABLE,
	remarks: STRING_NULLABLE,
});

export const VENDOR_NULL: Partial<IVendor> = {
	name: '',
	contact_number: '',
	email: '',
	office_address: '',
	remarks: '',
};

export type IVendor = z.infer<typeof VENDOR_SCHEMA>;

// Receive
export const RECEIVE_SCHEMA = z
	.object({
		vendor_uuid: STRING_REQUIRED,
		is_local: NUMBER_REQUIRED,
		lc_number: STRING_NULLABLE,
		challan_number: STRING_NULLABLE,
		remarks: STRING_NULLABLE,
		purchase: z.array(
			z.object({
				uuid: STRING_OPTIONAL,
				material_uuid: STRING_REQUIRED,
				quantity: NUMBER_DOUBLE_REQUIRED,
				price: NUMBER_DOUBLE_REQUIRED,
				remarks: STRING_NULLABLE,
			})
		),
	})
	.refine((data) => data.lc_number || data.challan_number, {
		message: 'Enter Challan Number or L/C Number',
		path: ['challan_number'],
	});

export const RECEIVE_NULL: Partial<IReceive> = {
	is_local: 1,
	challan_number: null,
	lc_number: null,
	remarks: null,
	purchase: [
		{
			material_uuid: '',
			quantity: 0,
			price: 0,
			remarks: '',
		},
	],
};

export type IReceive = z.infer<typeof RECEIVE_SCHEMA>;
