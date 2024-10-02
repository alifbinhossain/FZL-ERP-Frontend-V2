import { filterRoutes, filterSidebarRoutes, flattenRoutes } from '@/utils';

import privateRoutes from './private';

//* all private routes
export const allPrivateRoutes = privateRoutes;

//* all private routes flatten
export const allFlatRoutes = flattenRoutes(allPrivateRoutes);

//* filtered routes which has read access
export const filteredRoutes = filterRoutes(allPrivateRoutes);

//* flatten routes which has read access
export const flatRoutes = flattenRoutes(filteredRoutes);

//* sidebar routes which has view access only in sidebar
export const sidebarRoutes = filterSidebarRoutes(filteredRoutes);
