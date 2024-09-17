import { ColumnDef } from '@tanstack/react-table';

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
		header: 'Email',
	},
	{
		accessorKey: 'amount',
		header: 'Amount',
		meta: {
			filterVariant: 'range', // TODO: Update filter variant for column level filtering
		},
	},
];
