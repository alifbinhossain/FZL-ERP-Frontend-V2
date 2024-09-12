import { Form, FormField } from '@/components/ui/form';
import { LOGIN_NULL, LOGIN_SCHEMA, ILoginData } from './login-schema';
import useAuth from '@/contexts/auth/useAuth';
import { FormInput, FormSubmit } from '@/components/core/form';
import { useRHF } from '@/hooks';

const LoginForm = () => {
	const { login } = useAuth();
	const form = useRHF(LOGIN_SCHEMA, LOGIN_NULL);

	const onSubmit = async (data: ILoginData) => {
		await login(data);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mx-auto mt-6 flex max-w-md flex-col space-y-6 sm:mt-10 sm:space-y-8'>
				<FormField
					control={form.control}
					name='email'
					render={(props) => <FormInput type='email' {...props} />}
				/>
				<FormField
					control={form.control}
					name='pass'
					render={(props) => (
						<FormInput label='Password' {...props} />
					)}
				/>
				<FormSubmit />
			</form>
		</Form>
	);
};

export default LoginForm;
