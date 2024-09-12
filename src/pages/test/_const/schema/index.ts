import { STRING_REQUIRED } from '@/utils/validators';
import { z } from 'zod';

export const testSchema = z.object({
	name: STRING_REQUIRED,
});

export const testNull = {
	uuid: null,
	name: '',
};
export type ITest = z.infer<typeof testSchema>;
