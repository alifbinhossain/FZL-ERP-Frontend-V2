import { ColumnDef } from '@tanstack/react-table';

import { IMerchandiserData } from './type';

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
