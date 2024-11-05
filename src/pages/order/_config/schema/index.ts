import { z } from 'zod';

import {
	BOOLEAN_DEFAULT_VALUE,
	BOOLEAN_REQUIRED,
	EMAIL_NULLABLE,
	handelNumberDefaultValue,
	JSON_STRING_REQUIRED,
	NAME_REQUIRED,
	NUMBER_DOUBLE_NULLABLE,
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

	coloring_type: UUID_REQUIRED,

	// slider
	slider: UUID_NULLABLE,
	slider_body_shape: UUID_FK,
	slider_link: UUID_FK,

	slider_starting_section: STRING_REQUIRED.default('---'),

	// stopper
	top_stopper: UUID_FK,
	bottom_stopper: UUID_FK,

	// logo
	logo_type: UUID_FK,
	// is_logo_body: BOOLEAN.default(false).when('logo_type', {
	// 	is: (value) => value != null && value !== '', // Check if logo_type has a value
	// 	then: (schema) =>
	// 		schema.test(
	// 			'is_logo_body_test',
	// 			'Either logo body or logo puller is required',
	// 			function (value) {
	// 				// Pass if either is_logo_body is true or is_logo_puller is true
	// 				return value || this.parent.is_logo_puller;
	// 			}
	// 		),
	// 	otherwise: (schema) => schema, // No special validation if logo_type is null or empty
	// }),
	is_logo_body: BOOLEAN_DEFAULT_VALUE(false), // TODO: Fix this
	// is_logo_puller: BOOLEAN.default(false).when('logo_type', {
	// 	is: (value) => value != null && value !== '', // Check if logo_type has a value
	// 	then: (schema) =>
	// 		schema.test(
	// 			'is_logo_puller_test',
	// 			'Either logo body or logo puller is required',
	// 			function (value) {
	// 				// Pass if either is_logo_puller is true or is_logo_body is true
	// 				return value || this.parent.is_logo_body;
	// 			}
	// 		),
	// 	otherwise: (schema) => schema, // No special validation if logo_type is null or empty
	// }),
	is_logo_puller: BOOLEAN_DEFAULT_VALUE(false), // TODO: Fix this
	is_slider_provided: BOOLEAN_DEFAULT_VALUE(false),

	// garments
	end_user: UUID_FK,
	garment: STRING_NULLABLE,
	light_preference: UUID_FK,
	garments_wash: JSON_STRING_REQUIRED,
	garments_remarks: STRING_NULLABLE,

	order_entry: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			style: STRING_REQUIRED,
			color: STRING_REQUIRED,
			size: NUMBER_DOUBLE_REQUIRED,
			quantity: NUMBER_REQUIRED,
			company_price: NUMBER_DOUBLE_REQUIRED.transform(handelNumberDefaultValue).default(0),
			party_price: NUMBER_DOUBLE_REQUIRED.transform(handelNumberDefaultValue).default(0),
			bleaching: STRING_REQUIRED,
		})
	),
});

export const ORDER_NULL: Partial<IOrder> = {
	is_logo_body: false,
	is_logo_puller: false,
	special_requirement: '',
	description: '',
	remarks: '',
	slider_starting_section: '---',
	garments_wash: '',
	order_entry: [],
};

export type IOrder = z.infer<typeof ORDER_SCHEMA>;

// Order Info
export const ORDER_INFO_SCHEMA = z.object({
	reference_order_info_uuid: STRING_NULLABLE,
	is_sample: BOOLEAN_REQUIRED.default(false),
	is_bill: BOOLEAN_REQUIRED.default(true),
	is_cash: BOOLEAN_REQUIRED,
	conversion_rate: NUMBER_DOUBLE_NULLABLE.default(80),
	status: BOOLEAN_REQUIRED.default(false),
	marketing_uuid: STRING_REQUIRED,
	// merchandiser_uuid: STRING.when('is_sample', {
	// 	is: true,
	// 	then: (Schema) => Schema_NULLABLE,
	// 	otherwise: (Schema) => Schema.required('Required'),
	// }),
	merchandiser_uuid: STRING_NULLABLE, // TODO: Fix this
	factory_uuid: STRING_REQUIRED,
	party_uuid: STRING_REQUIRED,
	buyer_uuid: STRING_REQUIRED,
	marketing_priority: STRING_REQUIRED,
	factory_priority: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const ORDER_INFO_NULL: Partial<IOrderInfo> = {
	reference_order_info_uuid: '',
	is_sample: false,
	is_bill: true,
	is_cash: false,
	status: false,
	merchandiser_uuid: null,
	marketing_priority: '',
	factory_priority: '',
	remarks: '',
};

export type IOrderInfo = z.infer<typeof ORDER_INFO_SCHEMA>;

// Factory
export const FACTORY_SCHEMA = z.object({
	party_uuid: STRING_REQUIRED,
	name: STRING_REQUIRED,
	// phone: PHONE_NUMBER_NULLABLE.transform((value, originalValue) =>
	// 	originalValue === '' ? null : value
	// ),
	phone: PHONE_NUMBER_NULLABLE, // TODO: Fix this
	address: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const FACTORY_NULL: Partial<IFactory> = {
	name: '',
	phone: '',
	address: '',
	remarks: null,
};

export type IFactory = z.infer<typeof FACTORY_SCHEMA>;

// Buyer
export const BUYER_SCHEMA = z.object({
	name: NAME_REQUIRED,
	short_name: STRING_NULLABLE,
	remarks: STRING_NULLABLE,
});

export const BUYER_NULL: Partial<IBuyer> = {
	name: '',
	short_name: '',
	remarks: null,
};

export type IBuyer = z.infer<typeof BUYER_SCHEMA>;

// Marketing
export const MARKETING_SCHEMA = z.object({
	user_uuid: STRING_REQUIRED,
	name: STRING_REQUIRED,
	short_name: STRING_NULLABLE,
	remarks: STRING_NULLABLE,
});

export const MARKETING_NULL: Partial<IMarketing> = {
	name: '',
	short_name: '',
	remarks: null,
};

export type IMarketing = z.infer<typeof MARKETING_SCHEMA>;

// Merchandiser
export const MERCHANDISER_SCHEMA = z.object({
	party_uuid: STRING_REQUIRED,
	name: STRING_REQUIRED,
	email: EMAIL_NULLABLE,
	// phone: PHONE_NUMBER_NULLABLE.transform((value, originalValue) =>
	// 	originalValue === '' ? null : value
	// ),
	phone: PHONE_NUMBER_NULLABLE, // TODO: Fix this
	address: STRING_NULLABLE,
	remarks: STRING_NULLABLE,
});

export const MERCHANDISER_NULL: Partial<IMerchandiser> = {
	party_uuid: '',
	name: '',
	email: '',
	phone: '',
	address: '',
	remarks: null,
};

export type IMerchandiser = z.infer<typeof MERCHANDISER_SCHEMA>;

// Party
export const PARTY_SCHEMA = z.object({
	name: STRING_REQUIRED,
	short_name: STRING_NULLABLE,
	address: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const PARTY_NULL: Partial<IParty> = {
	name: '',
	short_name: '',
	address: '',
	remarks: null,
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

export const PROPERTIES_NULL: Partial<IProperties> = {
	item_for: '',
	type: '',
	name: '',
	short_name: '',
	remarks: null,
};

export type IProperties = z.infer<typeof PROPERTIES_SCHEMA>;
