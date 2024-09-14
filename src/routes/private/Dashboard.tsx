// Pages
// const Dashboard = lazy(() => import('@pages/Dashboard'));
// import Dashboard from '@pages/Dashboard';

import Section from '@/pages/store/section';
import Type from '@/pages/store/type';
import Vendor from '@/pages/store/vendor';
import { IRoute } from '@/types';

export const DashboardRoutes: IRoute[] = [
	{
		path: '/',
		name: 'Dashboard',
		// element: <Dashboard />,
		element: <Section />,
		page_name: 'dashboard',
		actions: ['read'],
	},
];
