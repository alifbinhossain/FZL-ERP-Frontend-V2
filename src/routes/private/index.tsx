// import { HrRoutes } from './Hr';

// import { CommercialRoutes } from './Commercial';
// import { OrderRoutes } from './Order';
// import { IssueRoutes } from './Issue';
// import { CommonRoutes } from './Common';
// import { MetalRoutes } from './Metal';
// import { NylonRoutes } from './Nylon';
// import { VislonRoutes } from './Vislon';
// import { SliderRoutes } from './Slider';
// import { LibraryRoutes } from './Library';
// import { DeliveryRoutes } from './Delivery';
// import { ThreadRoutes } from './Thread';
// import { LabDipRoutes } from './LabDip';
// import { DyeingAndIronRoutes } from './DyeingAndIron';
// import { IRoute } from '@/types';

import TestType1 from '@/pages/test/type1';
import { IRoute } from '@/types';

import { DashboardRoutes } from './Dashboard';
import { StoreRoutes } from './Store';

const privateRoutes: IRoute[] = [
	...DashboardRoutes,
	// ...OrderRoutes,
	// ...LabDipRoutes,
	// ...ThreadRoutes,
	// ...CommercialRoutes,
	// ...DeliveryRoutes,
	...StoreRoutes,
	// ...CommonRoutes,
	// ...IssueRoutes,
	// ...DyeingAndIronRoutes,
	// ...NylonRoutes,
	// ...VislonRoutes,
	// ...MetalRoutes,
	// ...SliderRoutes,
	// ...HrRoutes,
	// ...LibraryRoutes,

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
		],
	},
];

export default privateRoutes;
