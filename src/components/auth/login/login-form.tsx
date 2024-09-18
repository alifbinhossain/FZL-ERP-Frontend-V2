import { useAuth, useRHF } from '@/hooks';

import { FormInput, FormSubmit } from '@/components/core/form';
import { Form, FormField } from '@/components/ui/form';

import { ILoginData, LOGIN_NULL, LOGIN_SCHEMA } from './login-schema';

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
				className='mx-auto mt-6 flex max-w-md flex-col space-y-6 sm:mt-10'>
				<FormField
					control={form.control}
					name='email'
					render={(props) => <FormInput type='email' {...props} />}
				/>
				<FormField
					control={form.control}
					name='pass'
					render={(props) => (
						<FormInput
							type='password'
							label='Password'
							{...props}
						/>
					)}
				/>

				<FormSubmit title='Login' />
			</form>
		</Form>
	);
};

export default LoginForm;
