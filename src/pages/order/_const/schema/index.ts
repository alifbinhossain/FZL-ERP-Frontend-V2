import {
	BOOLEAN_DEFAULT_VALUE,
	BOOLEAN_REQUIRED,
	EMAIL_NULLABLE,
	handelNumberDefaultValue,
	JSON_STRING_REQUIRED,
	NAME_REQUIRED,
	NUMBER_DOUBLE_REQUIRED,
	NUMBER_REQUIRED,
	PHONE_NUMBER_NULLABLE,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
	UUID_FK,
	UUID_NULLABLE,
	UUID_REQUIRED,
} from '@/utils/validators';

import { z } from 'zod';

// Order
export const ORDER_SCHEMA = z.object({
	// * item section
	order_info_uuid: UUID_REQUIRED,
	item: UUID_REQUIRED,
	zipper_number: UUID_REQUIRED,
	end_type: UUID_REQUIRED,
	lock_type: UUID_REQUIRED,
	teeth_color: UUID_REQUIRED,
	special_requirement: JSON_STRING_REQUIRED,
	description: STRING_NULLABLE,
	remarks: STRING_NULLABLE,

	// * slider section
	// puller
	puller_type: UUID_REQUIRED,
	puller_color: UUID_REQUIRED,
	puller_link: UUID_FK,

	coloring_type: UUID_NULLABLE,

	// slider
	slider: UUID_NULLABLE,
	slider_body_shape: UUID_FK,
	slider_link: UUID_FK,
	slider_starting_section: STRING_REQUIRED.default('---'),

	// stopper
	top_stopper: UUID_FK,
	bottom_stopper: UUID_FK,

	hand: UUID_FK,

	// logo
	logo_type: UUID_FK,
	is_logo_body: BOOLEAN_DEFAULT_VALUE(false),
	is_logo_puller: BOOLEAN_DEFAULT_VALUE(false),
	is_slider_provided: BOOLEAN_DEFAULT_VALUE(false),

	// garments
	end_user: UUID_FK,
	garment: STRING_NULLABLE,
	light_preference: UUID_FK,
	garments_wash: JSON_STRING_REQUIRED,
	garments_remarks: STRING_NULLABLE,

	order_entry: z.array(
		z.object({
			style: STRING_REQUIRED,
			color: STRING_REQUIRED,
			size: NUMBER_DOUBLE_REQUIRED,
			quantity: NUMBER_REQUIRED,
			company_price: NUMBER_DOUBLE_REQUIRED.transform(
				handelNumberDefaultValue
			).default(0),
			party_price: NUMBER_DOUBLE_REQUIRED.transform(
				handelNumberDefaultValue
			).default(0),
		})
	),
});

export const ORDER_NULL = {
	id: null,
	order_info_uuid: null,
	order_description_uuid: null,
	item: null,
	zipper_number: null,
	end_type: null,
	lock_type: null,
	puller_type: null,
	teeth_color: null,
	puller_color: null,
	hand: null,
	special_requirement: '',
	description: '',
	remarks: '',
	slider_starting_section: '---',
	garments_wash: '',
	order_entry: [
		{
			order_description_uuid: null,
			style: '',
			color: '',
			size: '',
			quantity: '',
			company_price: 0,
			party_price: 0,
			status: 1,
			swatch_approval_date: null,
		},
	],
};

export type IOrder = z.infer<typeof ORDER_SCHEMA>;

// Order Info
export const ORDER_INFO_SCHEMA = z
	.object({
		reference_order_info_uuid: STRING_NULLABLE,
		is_sample: BOOLEAN_DEFAULT_VALUE(false),
		is_bill: BOOLEAN_DEFAULT_VALUE(true),
		is_cash: BOOLEAN_REQUIRED,
		status: BOOLEAN_DEFAULT_VALUE(false),
		marketing_uuid: UUID_REQUIRED,
		merchandiser_uuid: UUID_FK,
		factory_uuid: UUID_REQUIRED,
		party_uuid: UUID_REQUIRED,
		buyer_uuid: UUID_REQUIRED,
		marketing_priority: STRING_OPTIONAL,
		factory_priority: STRING_OPTIONAL,
		remarks: STRING_NULLABLE,
	})
	.refine(({ is_sample }) => is_sample === true, {
		message: 'Required',
		path: ['merchandiser_uuid'],
	});

export const ORDER_INFO_NULL = {
	uuid: null,
	reference_order_info_uuid: '',
	is_sample: false,
	is_bill: true,
	is_cash: false,
	status: false,
	marketing_uuid: null,
	merchandiser_uuid: null,
	factory_uuid: null,
	party_uuid: null,
	buyer_uuid: null,
	marketing_priority: '',
	factory_priority: '',
	remarks: '',
};

export type IOrderInfo = z.infer<typeof ORDER_INFO_SCHEMA>;

// Factory
export const FACTORY_SCHEMA = z.object({
	party_uuid: STRING_REQUIRED,
	name: STRING_REQUIRED,
	// phone: PHONE_NUMBER.nullable().transform((value, originalValue) =>
	// 	originalValue === '' ? null : value
	// ),
	phone: PHONE_NUMBER_NULLABLE,
	address: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const FACTORY_NULL = {
	uuid: null,
	party_uuid: null,
	name: '',
	phone: '',
	address: '',
	remarks: '',
};

export type IFactory = z.infer<typeof FACTORY_SCHEMA>;

// Buyer
export const BUYER_SCHEMA = z.object({
	name: NAME_REQUIRED,
	short_name: STRING_NULLABLE,
	remarks: STRING_NULLABLE,
});

export const BUYER_NULL = {
	uuid: null,
	name: '',
	short_name: '',
	remarks: '',
};

export type IBuyer = z.infer<typeof BUYER_SCHEMA>;

// Marketing
export const MARKETING_SCHEMA = z.object({
	user_uuid: STRING_REQUIRED,
	name: STRING_REQUIRED,
	short_name: STRING_NULLABLE,
	remarks: STRING_NULLABLE,
});

export const MARKETING_NULL = {
	uuid: null,
	user_uuid: null,
	name: '',
	short_name: '',
	remarks: '',
};

export type IMarketing = z.infer<typeof MARKETING_SCHEMA>;

// Merchandiser
export const MERCHANDISER_SCHEMA = z.object({
	party_uuid: STRING_REQUIRED,
	name: STRING_REQUIRED,
	email: EMAIL_NULLABLE,
	// phone: PHONE_NUMBER.nullable().transform((value, originalValue) =>
	// 	originalValue === '' ? null : value
	// ),
	phone: PHONE_NUMBER_NULLABLE,
	address: STRING_NULLABLE,
	remarks: STRING_NULLABLE,
});

export const MERCHANDISER_NULL = {
	uuid: null,
	party_uuid: null,
	name: '',
	email: '',
	phone: '',
	address: '',
	remarks: '',
};

export type IMerchandiser = z.infer<typeof MERCHANDISER_SCHEMA>;

// Party
export const PARTY_SCHEMA = z.object({
	name: STRING_REQUIRED,
	short_name: STRING_NULLABLE,
	remarks: STRING_NULLABLE,
});

export const PARTY_NULL = {
	uuid: null,
	name: '',
	short_name: '',
	remarks: '',
};

export type IParty = z.infer<typeof PARTY_SCHEMA>;

// Order Properties
export const PROPERTIES_SCHEMA = z.object({
	item_for: STRING_REQUIRED,
	type: STRING_REQUIRED,
	name: STRING_REQUIRED,
	short_name: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const PROPERTIES_NULL = {
	uuid: null,
	item_for: '',
	type: '',
	name: '',
	short_name: '',
	remarks: '',
	created_by: '',
	created_at: '',
	updated_at: '',
};
