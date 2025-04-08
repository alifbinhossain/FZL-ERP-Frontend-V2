import { ColumnDef } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';

import { IMerchandiserData, IOrderDetails } from './type';

//* Merchandiser
export const merchandiserColumns = (): ColumnDef<IMerchandiserData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'party_name',
		header: 'Party Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'email',
		header: 'Email',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'phone',
		header: 'Phone',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'address',
		header: 'Address',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

export const orderDetailsColumns = (): ColumnDef<IOrderDetails>[] => [
	{
		accessorKey: 'is_sample',
		header: 'Sample',
		enableColumnFilter: false,
		cell: (info) => <StatusButton value={info.getValue<number>()} />,
	},
	{
		accessorKey: 'order_number',
		header: 'O/N',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'item_description',
		header: 'Item Description',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'party_name',
		header: 'Party',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'item_name',
		header: 'Item',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'is_multi_color',
		header: 'Multi Color',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'marketing_name',
		header: 'Marketing',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'buyer_name',
		header: 'Buyer',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'swatch',
		header: 'Swatch',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'print_in',
		header: 'Price App',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];
