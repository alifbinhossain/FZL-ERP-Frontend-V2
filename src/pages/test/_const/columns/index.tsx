import { ColumnDef } from '@tanstack/react-table';
import { TableColumnHeader } from '@/components/core/table/_components/table-column-header';

export type Payment = {
	id: string;
	amount: number;
	status: 'pending' | 'processing' | 'success' | 'failed';
	email: string;
};

export const testColumns = (): ColumnDef<Payment>[] => [
	{
		accessorKey: 'status',
		header: 'Status',
	},
	{
		accessorKey: 'email',
		header: ({ column }) => (
			<TableColumnHeader column={column} title='Email' />
		),
	},
	{
		accessorKey: 'amount',
		header: ({ column }) => (
			<TableColumnHeader column={column} title='Amount' />
		),
	},
	{
		id: 'action',
		accessorKey: 'action',
		header: 'Actions',
		cell: (info) => info.getValue(),
	},
];
