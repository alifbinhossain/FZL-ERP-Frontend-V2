import { lazy } from 'react';
import { IRoute } from '@/types';

const TestType1 = lazy(() => import('@/pages/test/type1'));
const TestType2 = lazy(() => import('@/pages/test/type2'));
const TestType3 = lazy(() => import('@/pages/test/type3'));
const TestType3AddOrUpdate = lazy(
	() => import('@/pages/test/type3/add-or-update')
);

const TestRoutes: IRoute[] = [
	{
		name: 'Test',
		children: [
			{
				name: 'Type 1',
				path: '/test/type1',
				element: <TestType1 />,
				page_name: 'order__info',
				actions: ['read', 'create', 'update', 'delete'],
			},
			{
				name: 'Type 2',
				path: '/test/type2',
				element: <TestType2 />,
				page_name: 'order__info',
				actions: ['read', 'create', 'update', 'delete'],
			},
			{
				name: 'Type 3',
				path: '/test/type3',
				element: <TestType3 />,
				page_name: 'order__info',
				actions: ['read', 'create', 'update', 'delete'],
				disableCollapse: true,
				children: [
					{
						name: 'Add',
						path: '/test/type3/add',
						element: <TestType3AddOrUpdate />,
						page_name: 'order__info',
						actions: ['read', 'create', 'update', 'delete'],
						hidden: true,
					},
					{
						name: 'Edit',
						path: '/test/type3/:id/update',
						element: <TestType3AddOrUpdate />,
						page_name: 'order__info',
						actions: ['read', 'create', 'update', 'delete'],
						hidden: true,
					},
				],
			},
		],
	},
];

export default TestRoutes;
