// Pages
// const Dashboard = lazy(() => import('@pages/Dashboard'));
// import Dashboard from '@pages/Dashboard';

import Test from '@/pages/test';
import { IRoute } from '@/types';

export const DashboardRoutes: IRoute[] = [
	{
		path: '/',
		name: 'Dashboard',
		// element: <Dashboard />,
		element: <Test />,
		page_name: 'dashboard',
		actions: ['read'],
	},
];
