import CommercialRoutes from '@/pages/commercial/_config/routes';
import CommonRoutes from '@/pages/common/_config/routes';
import DashboardRoutes from '@/pages/dashboard/_config/routes';
import DeliveryRoutes from '@/pages/delivery/_config/routes';
import DyeingAndIronRoutes from '@/pages/dying-and-iron/_config/routes';
import HrRoutes from '@/pages/hr/_config/routes';
import LabDipRoutes from '@/pages/lab-dip/_config/routes';
import LibraryRoutes from '@/pages/library/_config/routes';
import MetalRoutes from '@/pages/metal/_config/routes';
import NylonRoutes from '@/pages/nylon/_config/routes';
import OrderRoutes from '@/pages/order/_config/routes';
import SliderRoutes from '@/pages/slider/_config/routes';
import StoreRoutes from '@/pages/store/_config/routes';
import TemplateRoutes from '@/pages/template/_config/routes';
import ThreadRoutes from '@/pages/thread/_config/routes';
import VislonRoutes from '@/pages/vislon/_config/routes';
import { IRoute } from '@/types';
import { cloneDeep } from 'lodash';

const privateRoutes: IRoute[] = [
	...DashboardRoutes,
	...OrderRoutes,
	...LabDipRoutes,
	...ThreadRoutes,
	...CommercialRoutes,
	...DeliveryRoutes,
	...StoreRoutes,
	...CommonRoutes,
	...DyeingAndIronRoutes,
	...NylonRoutes,
	...VislonRoutes,
	...MetalRoutes,
	...SliderRoutes,
	...HrRoutes,
	...LibraryRoutes,
	...TemplateRoutes,
];

const privateRoutesClone = cloneDeep(privateRoutes);

export { privateRoutes, privateRoutesClone };
