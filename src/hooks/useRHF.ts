import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

function useRHF<T extends z.ZodRawShape>(
	schema: z.ZodObject<T>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	defaultValues: any
) {
	type IFormType = z.infer<typeof schema>;
	const form = useForm<IFormType>({
		resolver: zodResolver(schema),
		defaultValues,
	});

	return form;
}

export default useRHF;
