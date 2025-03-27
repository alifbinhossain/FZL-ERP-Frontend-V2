import { lazy } from 'react';
import OrderDetails from '@/pages/order/details';
import { IRoute } from '@/types';

const Merchandiser = lazy(() => import('@/pages/order/merchandiser'));

const OrderRoutes: IRoute[] = [
	{
		name: 'Order',
		children: [
			{
				name: 'Product Description',
				path: '/order/details',
				element: <OrderDetails />,
				page_name: 'order__details',
				actions: [
					'create',
					'read',
					'update',
					'delete',
					'click_order_number',
					'click_item_description',
					'show_all_orders',
					'show_own_orders',
					'show_approved_orders',
					'show_price',
					'show_cash_bill_lc',
				],
			},
			{
				name: 'Merchandiser',
				path: '/order/merchandiser',
				element: <Merchandiser />,
				page_name: 'order__merchandiser',
				actions: ['create', 'read', 'update', 'delete'],
				page_type: {
					type: 'library',
					name: 'lib',
				},
			},
		],
	},
];
export default OrderRoutes;
