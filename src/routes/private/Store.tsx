// * Store

import { lazy } from 'react';
import { IRoute } from '@/types';

const Stock = lazy(() => import('@/pages/store/stock'));
const Section = lazy(() => import('@/pages/store/section'));
const Type = lazy(() => import('@/pages/store/type'));
const Vendor = lazy(() => import('@/pages/store/vendor'));
const Receive = lazy(() => import('@/pages/store/receive'));
const ReceiveAddOrUpdate = lazy(() => import('@/pages/store/receive/add-or-update'));

const ReceiveDetails = lazy(() => import('@/pages/store/receive/details'));

const StoreRoutes: IRoute[] = [
	{
		name: 'Store',
		children: [
			{
				name: 'Stock',
				path: '/store/stock',
				element: <Stock />,
				page_name: 'store__stock',
				actions: ['create', 'read', 'update', 'delete', 'click_trx_against_order', 'click_action'],
			},

			{
				name: 'Section',
				path: '/store/section',
				element: <Section />,
				page_name: 'store__section',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Type',
				path: '/store/type',
				element: <Type />,
				page_name: 'store__type',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Vendor',
				path: '/store/vendor',
				element: <Vendor />,
				page_name: 'store__vendor',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Receive',
				path: '/store/receive',
				element: <Receive />,
				page_name: 'store__receive',
				actions: ['create', 'read', 'update'],
				disableCollapse: true,
				children: [
					{
						name: 'Details',
						path: '/store/receive/:id',
						element: <ReceiveDetails />,
						hidden: true,
						page_name: 'store__receive_by_uuid',
						actions: ['create', 'read', 'update'],
					},
					{
						name: 'Entry',
						path: '/store/receive/add',
						element: <ReceiveAddOrUpdate />,
						hidden: true,
						page_name: 'store__receive_entry',
						actions: ['create', 'read', 'update'],
					},
					{
						name: 'Entry',
						path: '/store/receive/:id/update',
						element: <ReceiveAddOrUpdate />,
						hidden: true,
						page_name: 'store__receive_update',
						actions: ['create', 'read', 'update'],
					},
				],
			},

			// {
			// 	name: 'Log',
			// 	path: '/store/log',
			// 	element: <MaterialLog />,
			// 	page_name: 'store__log',
			// 	actions: [
			// 		'read',
			// 		'update_log',
			// 		'delete_log',
			// 		'update_log_against_order',
			// 		'delete_log_against_order',
			// 	],
			// },
		],
	},
];
export default StoreRoutes;
