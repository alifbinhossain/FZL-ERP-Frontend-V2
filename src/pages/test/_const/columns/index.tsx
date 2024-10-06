import { ColumnDef, Row } from '@tanstack/react-table';

import Transfer from '@/components/buttons/transfer';
import { LinkOnly } from '@/components/link';

import { IPaymentTableData, ITestDetailsEntry } from './columns.type';

// TODO: Replace with real data columns of Table
export const test1Columns = (): ColumnDef<IPaymentTableData>[] => [
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

// TODO: Replace with real data type of Table
export function test2Columns({
	actionTrxAgainstOrderAccess,
	actionTrxAccess,
	handleAgainstOrder,
	handleAgainstTrx,
}: {
	actionTrxAccess: boolean;
	actionTrxAgainstOrderAccess: boolean;
	handleAgainstOrder: (row: Row<any>) => void;
	handleAgainstTrx: (row: Row<any>) => void;
}): ColumnDef<IPaymentTableData>[] {
	return [
		{
			accessorKey: 'status',
			header: 'Status',
		},
		{
			accessorKey: 'email',
			header: 'Email',
		},

		{
			accessorKey: 'action_trx',
			id: 'action_trx',
			header: 'Test Trx', // TODO: Update header name
			enableColumnFilter: false,
			enableSorting: false,
			cell: (info) => (
				<Transfer onClick={() => handleAgainstTrx(info.row)} />
			),
			size: 40,
			meta: {
				hidden: !actionTrxAccess,
			},
		},

		{
			accessorKey: 'action_trx_against_order',
			id: 'action_trx_against_order',
			header: 'Trx Against Order',
			enableColumnFilter: false,
			enableSorting: false,
			cell: (info) => (
				<Transfer onClick={() => handleAgainstOrder(info.row)} />
			),
			size: 40,
			meta: {
				hidden: !actionTrxAgainstOrderAccess,
			},
		},
		{
			accessorKey: 'amount',
			header: 'Amount',
			meta: {
				filterVariant: 'range', // TODO: Update filter variant for column level filtering
			},
		},
	];
}

// TODO: Replace with real data columns of Table
export const test3Columns = (): ColumnDef<IPaymentTableData>[] => [
	{
		accessorKey: 'id',
		header: 'ID',
		cell: (info) => (
			<LinkOnly
				uri={`/test/type3/${info.getValue()}`}
				title={`Details - ${info.getValue()}`}
			/>
		),
	},
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

// TODO: Replace with real data type of Table
export const testEntryColumns = (): ColumnDef<ITestDetailsEntry>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'stock',
		header: 'Stock',
	},
];
