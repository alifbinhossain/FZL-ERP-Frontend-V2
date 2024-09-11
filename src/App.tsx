import { Toast } from '@/components/toast';
import AuthProvider from '@/contexts/auth';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/router';

const App = () => {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
			<Toast />
		</AuthProvider>
	);
};

export default App;
