import {
	BOOLEAN_OPTIONAL,
	BOOLEAN_REQUIRED,
	JSON_STRING_REQUIRED,
	NUMBER_DOUBLE_REQUIRED,
	NUMBER_OPTIONAL,
	NUMBER_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';
import { z } from 'zod';

// LC
export const LC_SCHEMA = z.object({
	party_uuid: STRING_REQUIRED,
	lc_number: STRING_REQUIRED,
	lc_date: STRING_REQUIRED,
	payment_value: NUMBER_DOUBLE_REQUIRED,
	payment_date: STRING_NULLABLE,
	ldbc_fdbc: STRING_REQUIRED.nullable(),
	acceptance_date: STRING_NULLABLE,
	maturity_date: STRING_NULLABLE,
	commercial_executive: STRING_REQUIRED,
	party_bank: STRING_REQUIRED,
	production_complete: BOOLEAN_REQUIRED,
	lc_cancel: BOOLEAN_REQUIRED,
	document_receive_date: STRING_NULLABLE, // dev
	handover_date: STRING_NULLABLE,
	shipment_date: STRING_NULLABLE,
	expiry_date: STRING_NULLABLE,
	ud_no: STRING_NULLABLE,
	ud_received: STRING_NULLABLE,
	at_sight: STRING_OPTIONAL,
	amd_date: STRING_NULLABLE,
	amd_count: NUMBER_OPTIONAL,
	problematical: BOOLEAN_REQUIRED,
	epz: BOOLEAN_REQUIRED,
	remarks: STRING_NULLABLE,
	pi: z.array(z.object({})),
});

export const LC_NULL = {
	uuid: null,
	party_uuid: null,
	lc_number: null,
	lc_date: null,
	payment_value: 0,
	payment_date: null,
	ldbc_fdbc: null,
	acceptance_date: null,
	maturity_date: null,
	commercial_executive: null,
	party_bank: null,
	production_complete: false,
	lc_cancel: false,
	handover_date: null,
	document_receive_date: null,
	shipment_date: null,
	expiry_date: null,
	ud_no: null,
	ud_received: null,
	at_sight: false,
	amd_date: null,
	amd_count: 0,
	problematical: false,
	epz: false,
	remarks: null,
	pi: [
		{
			uuid: null,
		},
	],
};

export type ILC = z.infer<typeof LC_SCHEMA>;

// PI
export const PI_SCHEMA = z.object({
	lc_uuid: STRING_NULLABLE,
	marketing_uuid: STRING_REQUIRED,
	party_uuid: STRING_REQUIRED,
	order_info_uuids: JSON_STRING_REQUIRED,
	merchandiser_uuid: STRING_REQUIRED,
	factory_uuid: STRING_REQUIRED,
	bank_uuid: STRING_REQUIRED,
	validity: NUMBER_REQUIRED,
	payment: NUMBER_REQUIRED,
	remarks: STRING_NULLABLE,
	pi_entry: z.array(
		z
			.object({
				is_checked: BOOLEAN_REQUIRED,
				sfg_uuid: STRING_REQUIRED,
				pi_uuid: STRING_OPTIONAL,
				max_quantity: NUMBER_OPTIONAL,
				pi_quantity: NUMBER_REQUIRED,
				remarks: STRING_NULLABLE,
				isDeletable: BOOLEAN_OPTIONAL,
			})
			.refine(
				({ pi_quantity, max_quantity }) =>
					max_quantity === null ||
					max_quantity === undefined ||
					pi_quantity <= max_quantity,
				{
					message: 'Beyond Max Quantity',
					path: ['pi_quantity'],
				}
			)
	),
});

export const PI_NULL = {
	uuid: null,
	marketing_uuid: '',
	party_uuid: '',
	order_info_uuids: null,
	merchandiser_uuid: '',
	factory_uuid: '',
	bank_uuid: '',
	validity: '',
	payment: '',
	remarks: '',
	pi_entry: [
		{
			is_checked: false,
			sfg_uuid: '',
			pi_uuid: '',
			max_quantity: null,
			pi_quantity: null,
			remarks: '',
			isDeletable: false,
		},
	],
};

export type IPI = z.infer<typeof PI_SCHEMA>;

// Bank
export const BANK_SCHEMA = z.object({
	name: STRING_REQUIRED,
	swift_code: STRING_REQUIRED,
	address: STRING_REQUIRED,
	policy: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const BANK_NULL = {
	uuid: null,
	name: '',
	swift_code: '',
	address: '',
	policy: '',
	remarks: null,
};

export type IBank = z.infer<typeof BANK_SCHEMA>;
