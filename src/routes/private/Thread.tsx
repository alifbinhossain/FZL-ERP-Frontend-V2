import { lazy } from 'react';
import { IRoute } from '@/types';

const ThreadOrder = lazy(() => import('@/pages/thread/order'));
const ThreadOrderEntry = lazy(
	() => import('@/pages/thread/order/add-or-update')
);

const ThreadRoutes: IRoute[] = [
	{
		name: 'Thread',
		children: [
			{
				name: 'Order',
				path: '/thread/order-info',
				element: <ThreadOrder />,
				page_name: 'thread__order_info_details',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Entry',
				path: '/thread/order-info/add',
				element: <ThreadOrderEntry />,
				page_name: 'thread__order_info_entry',
				actions: ['create', 'read', 'update', 'delete'],
				hidden: true,
			},
			{
				name: 'Update',
				path: '/thread/order-info/:id/update',
				element: <ThreadOrderEntry />,
				page_name: 'thread__order_info_update',
				actions: ['create', 'read', 'update', 'delete'],
				hidden: true,
			},
		],
	},
];
export default ThreadRoutes;
