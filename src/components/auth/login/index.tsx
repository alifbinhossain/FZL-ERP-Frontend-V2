import { useEffect } from 'react';
import useAuth from '@/contexts/auth/useAuth';
import { useNavigate } from 'react-router-dom';
import LoginForm from './login-form';

const Login = () => {
	const { user, signed } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (signed === true) {
			navigate('/', { replace: true });
		}
	}, [signed, user, navigate]);

	return (
		<div className='flex min-h-screen min-w-max flex-col justify-center py-6 sm:py-12'>
			<div className='relative min-w-[40%] py-3 sm:mx-auto sm:max-w-xl'>
				<div className='absolute inset-0 -skew-y-6 transform animate-pulse bg-gradient-to-r from-primary to-primary/50 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl'></div>
				<div className='relative bg-white px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20'>
					<div className='mx-auto'>
						<span className='font-heading flex items-center justify-center text-2xl font-bold'>
							<span className='text-4xl text-primary'>
								Fortune Zipper LTD
							</span>
						</span>
						<LoginForm />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;

{
	/* <form
							onSubmit={handleSubmit(onSubmit)}
							noValidate
							method='dialog'
							className='mx-auto mt-6 flex max-w-md flex-col space-y-6 sm:mt-10 sm:space-y-8'>
							<Input
								label='email'
								type='email'
								{...{ register, errors }}
							/>

							<PasswordInput
								title='Password'
								label='pass'
								{...{ register, errors }}
							/>

							<div className='modal-action'>
								<button
									type='submit'
									className='btn btn-primary btn-block'>
									Login
								</button>
							</div>
						</form> */
}
