import { STRING_REQUIRED } from '@/utils/validators';
import { z } from 'zod';

// TODO: Remove this demo schema and add all the schemas like this
export const TEST_SCHEMA = z.object({
	email: STRING_REQUIRED,
});
export const TEST_NULL = {
	uuid: null,
	email: '',
};
export type ITest = z.infer<typeof TEST_SCHEMA>;
