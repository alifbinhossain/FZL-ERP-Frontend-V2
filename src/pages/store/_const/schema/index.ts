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
	name: STRING_REQUIRED,
	unit: STRING_REQUIRED,
	short_name: STRING_OPTIONAL,
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
	section_uuid: null,
	type_uuid: null,
	remarks: '',
};
export type IMaterial = z.infer<typeof MATERIAL_SCHEMA>;

// Material Trx Against Order
export const MATERIAL_TRX_AGAINST_ORDER_SCHEMA = z.object({
	order_description_uuid: STRING_REQUIRED,
	trx_to: STRING_REQUIRED,
	trx_quantity: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING_NULLABLE,
});
export const MATERIAL_TRX_AGAINST_ORDER_NULL = {
	uuid: null,
	material_uuid: null,
	order_description_uuid: null,
	trx_to: '',
	trx_quantity: '',
	created_by: '',
	remarks: '',
};
export type IMaterialTrxAgainstOrder = z.infer<
	typeof MATERIAL_TRX_AGAINST_ORDER_SCHEMA
>;

// Material Stock
export const MATERIAL_STOCK_SCHEMA = z.object({
	trx_to: STRING_REQUIRED,
	trx_quantity: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING_NULLABLE,
});
export const MATERIAL_STOCK_NULL = {
	uuid: null,
	material_uuid: null,
	trx_to: '',
	trx_quantity: '',
	created_by: '',
	remarks: '',
};
export type IMaterialStock = z.infer<typeof MATERIAL_STOCK_SCHEMA>;

// Section
export const SECTION_SCHEMA = z.object({
	name: STRING_REQUIRED,
	short_name: STRING_OPTIONAL,
	remarks: STRING_NULLABLE,
});
export const SECTION_NULL = {
	uuid: null,
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

export const VENDOR_NULL = {
	uuid: null,
	name: '',
	contact_number: '',
	email: '',
	office_address: '',
	remarks: '',
};

export type IVendor = z.infer<typeof VENDOR_SCHEMA>;

// Purchase Receive
export const PURCHASE_RECEIVE_SCHEMA = z
	.object({
		vendor_uuid: STRING_REQUIRED,
		is_local: NUMBER_REQUIRED.default(0),
		lc_number: STRING_NULLABLE,
		challan_number: STRING_NULLABLE,
		remarks: STRING_NULLABLE,
		purchase: z.array(
			z.object({
				material_uuid: STRING_REQUIRED,
				quantity: NUMBER_DOUBLE_REQUIRED,
				price: NUMBER_DOUBLE_REQUIRED,
				remarks: STRING_NULLABLE,
			})
		),
	})
	.refine(({ lc_number }) => lc_number !== '', {
		message: 'Enter Challan Number or L/C Number',
		path: ['challan_number'],
	});

export const PURCHASE_RECEIVE_NULL = {
	uuid: null,
	vendor_uuid: null,
	is_local: null,
	lc_number: '',
	challan_number: null,
	remarks: '',
	purchase: [
		{
			purchase_description_uuid: null,
			material_uuid: null,
			quantity: '',
			price: '',
			remarks: '',
		},
	],
};

export type IPurchaseReceive = z.infer<typeof PURCHASE_RECEIVE_SCHEMA>;
