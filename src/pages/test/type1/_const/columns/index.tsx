import { ColumnDef } from '@tanstack/react-table';
import { TableColumnHeader } from '@/components/core/table/_components/table-column-header';

// TODO: Replace with real data type of Table
export type IPaymentTableData = {
	id: string;
	amount: number;
	status: 'pending' | 'processing' | 'success' | 'failed';
	email: string;
};

// TODO: Replace with real data columns of Table
export const testColumns = (): ColumnDef<IPaymentTableData>[] => [
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
];
