import { Toast } from '@/components/toast';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/router';
import { AuthProvider } from '@/context';
import { Toaster } from '@/components/ui/sonner';

const App = () => {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
			<Toast />
			<Toaster richColors position={'top-center'} expand={false} />
		</AuthProvider>
	);
};

export default App;
