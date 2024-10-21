import { lazy } from 'react';
import { IRoute } from '@/types';

const Merchandiser = lazy(() => import('@/pages/order/merchandiser'));
const Test = lazy(() => import('@/pages/order/test'));

const OrderRoutes: IRoute[] = [
	{
		name: 'Order',
		children: [
			{
				name: 'Merchandiser',
				path: '/order/merchandiser',
				element: <Merchandiser />,
				page_name: 'order__merchandiser',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Test',
				path: '/order/test',
				element: <Test />,
				page_name: 'order__merchandiser',
				actions: ['create', 'read', 'update', 'delete'],
			},
		],
	},
];
export default OrderRoutes;
