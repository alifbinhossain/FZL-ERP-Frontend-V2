import { ColumnDef } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status-button';
import { LinkOnly } from '@/components/link';
import DateTime from '@/components/ui/date-time';

import { IOrderTableData } from './columns.type';

export const orderColumns = (): ColumnDef<IOrderTableData>[] => [
	{
		accessorKey: 'is_sample',
		header: 'Sample/Bill/Cash',
		enableColumnFilter: false,
		cell: (info) => {
			const { is_sample, is_bill, is_cash } = info.row.original;
			return (
				<div className='flex space-x-1'>
					<StatusButton value={is_sample} />
					<StatusButton value={is_bill} />
					<StatusButton value={is_cash} />
				</div>
			);
		},
	},
	{
		accessorKey: 'order_number',
		header: 'ID',
		cell: (info) => {
			const { uuid } = info.row.original;
			return (
				<LinkOnly
					uri={`/thread/order-info/${uuid}`}
					title={info.getValue<string>()}
				/>
			);
		},
	},
	{
		accessorKey: 'party_name',
		header: 'Party',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'factory_name',
		header: 'Factory',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'merchandiser_name',
		header: 'Merchandiser',
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
		accessorKey: 'swatch_status',
		header: 'Swatch Approved',
		enableColumnFilter: false,
		cell: (info) => {
			const { order_entry_count, swatch_approval_count } =
				info.row.original;
			return `${swatch_approval_count} / ${order_entry_count}`;
		},
	},
	{
		accessorKey: 'is_swatches_approved',
		header: 'Status',
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<div className='flex space-x-1'>
					<StatusButton value={info.getValue<number>()} />
				</div>
			);
		},
	},
	{
		accessorKey: 'delivery_date',
		header: 'Delivery Date',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue<Date>()} />,
	},
];
