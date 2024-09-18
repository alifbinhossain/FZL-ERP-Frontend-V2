import { lazy } from 'react';
import { IRoute } from '@/types';

const TestType1 = lazy(() => import('@/pages/test/type1'));
const TestType2 = lazy(() => import('@/pages/test/type2'));

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
		],
	},
];

export default TestRoutes;
