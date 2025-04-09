import { ITableFacetedFilter, ITableFilterOptionSSR } from '@/types';

import { IOrderDetails } from './type';

export const type1FacetedFilters: ITableFacetedFilter[] = [
	{
		id: 'status',
		title: 'Status',
		options: [
			{
				label: 'Success',
				value: 'success',
			},
			{
				label: 'Failed',
				value: 'failed',
			},
		],
	},
];

export const orderDetailsFilters: ITableFilterOptionSSR<IOrderDetails>[] = [
	{
		accessor: 'order_info_uuid',
		label: 'Order Number',
		type: 'select',
		apiUrl: '/other/order/info/value/label',
		isPinned: true,
	},
	{
		accessor: 'marketing_uuid',
		label: 'Marketing',
		type: 'select',
		apiUrl: '/other/marketing/value/label',
	},
	{
		accessor: 'buyer_uuid',
		label: 'Buyer',
		type: 'select',
		apiUrl: '/other/buyer/value/label',
	},
	{
		accessor: 'party_uuid',
		label: 'Party',
		type: 'select',
		apiUrl: '/other/party/value/label',
	},
];
