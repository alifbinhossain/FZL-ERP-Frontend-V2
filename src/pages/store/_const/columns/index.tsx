import { ColumnDef, Row } from '@tanstack/react-table';

import TableTransfer from '@/components/core/data-table/_components/table-transfer';

import {
	IReceiveTableData,
	ISectionTableData,
	IStockTableData,
	ITypeTableData,
	IVendorTableData,
} from './columns.type';

// Vendor
export const vendorColumns = (): ColumnDef<IVendorTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'contact_name',
		header: 'Person',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'contact_number',
		header: 'Phone',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'email',
		header: 'Email',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'office_address',
		header: 'Address',
		cell: (info) => info.getValue(),
	},
];

// Type
export const typeColumns = (): ColumnDef<ITypeTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'short_name',
		header: 'Short Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

// Section
export const sectionColumns = (): ColumnDef<ISectionTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'short_name',
		header: 'Short Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

//Stock
export function stockColumns({
	actionTrxAgainstOrderAccess,
	actionTrxAccess,
	handleAgainstOrder,
	handleAgainstTrx,
}: {
	actionTrxAccess: boolean;
	actionTrxAgainstOrderAccess: boolean;
	handleAgainstOrder: (row: Row<any>) => void;
	handleAgainstTrx: (row: Row<any>) => void;
}): ColumnDef<IStockTableData>[] {
	return [
		{
			accessorKey: 'name',
			header: 'Name',
			enableColumnFilter: false,
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: 'threshold',
			header: 'Threshold',
			enableColumnFilter: false,
			cell: (info) => Number(info.getValue()),
		},
		{
			accessorKey: 'stock',
			header: 'Stock',
			enableColumnFilter: false,
			cell: (info) => {
				const cls =
					Number(info.row.original.threshold) >
					Number(info.getValue())
						? 'text-error bg-error/10 px-2 py-1 rounded-md'
						: '';
				return <span className={cls}>{Number(info.getValue())}</span>;
			},
		},
		{
			accessorKey: 'unit',
			header: 'Unit',
			enableColumnFilter: false,
			cell: (info) => info.getValue(),
		},

		{
			id: 'action_trx',
			accessorKey: 'action_trx',
			header: 'Material Trx',
			enableColumnFilter: false,
			enableSorting: false,
			cell: (info) => (
				<TableTransfer
					info={info}
					onClick={() => handleAgainstTrx(info.row)}
				/>
			),
			size: 40,
			meta: {
				hidden: !actionTrxAccess,
			},
		},

		{
			id: 'action_trx_against_order',
			accessorKey: 'action_trx_against_order',
			header: 'Trx Against Order',
			enableColumnFilter: false,
			enableSorting: false,
			cell: (info) => (
				<TableTransfer
					info={info}
					onClick={() => handleAgainstOrder(info.row)}
				/>
			),
			size: 40,
			meta: {
				hidden: !actionTrxAgainstOrderAccess,
			},
		},
		{
			accessorKey: 'section_name',
			header: 'Section',
			enableColumnFilter: false,
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: 'type_name',
			header: 'Type',
			enableColumnFilter: false,
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: 'description',
			header: 'Description',
			enableColumnFilter: false,
			cell: (info) => info.getValue(),
		},
	];
}

// Receive
export const receiveColumns = (): ColumnDef<IReceiveTableData>[] => [
	{
		accessorKey: 'purchase_id',
		header: 'ID',
		enableColumnFilter: false,
		cell: (info) => {
			const { uuid } = info.row.original;
			return <span>{info.getValue<string>()}</span>;
			// return (
			// 	<LinkOnly
			// 		uri='/store/receive'
			// 		id={uuid}
			// 		title={info.getValue()}
			// 	/>
			// );
		},
	},
	{
		accessorKey: 'vendor_name',
		header: 'Vendor',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'challan_number',
		header: 'Challan No',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'is_local',
		header: 'Local/LC',
		enableColumnFilter: false,
		cell: (info) => {
			return info.getValue() == 1 ? 'Local' : 'LC';
		},
	},
];
