import { z } from 'zod';

import { NUMBER_REQUIRED, STRING_NULLABLE, STRING_REQUIRED, URL_REQUIRED } from '@/utils/validators';

// Policy Schema
export const POLICY_SCHEMA = z.object({
	type: STRING_REQUIRED,
	title: STRING_REQUIRED,
	sub_title: STRING_REQUIRED,
	status: NUMBER_REQUIRED,
	url: URL_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const POLICY_NULL = {
	uuid: null,
	type: '',
	title: '',
	sub_title: '',
	status: 1,
	url: '',
	updated_at: '',
	remarks: '',
};

export type IPolicy = z.infer<typeof POLICY_SCHEMA>;
