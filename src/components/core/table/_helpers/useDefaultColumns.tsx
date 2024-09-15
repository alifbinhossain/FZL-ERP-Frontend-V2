import { ColumnDef } from '@tanstack/react-table';
import { usePage } from '@/hooks';

import DateTime from '@/components/ui/date-time';

import TableCellAction from '../_components/table-cell-action';

const useDefaultColumns = <TData, TValue>(): ColumnDef<TData, TValue>[] => {
	const { deleteAccess, updateAccess } = usePage();

	const columns: ColumnDef<TData, TValue>[] = [
		{
			accessorKey: 'remarks',
			header: 'Remarks',
			enableColumnFilter: false,
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: 'created_by_name',
			header: 'Created By',
			enableColumnFilter: false,
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: 'created_at',
			header: 'Created',
			enableColumnFilter: false,
			cell: (info) => <DateTime date={info.getValue() as Date} />,
		},
		{
			accessorKey: 'updated_at',
			header: 'Updated',
			enableColumnFilter: false,
			cell: (info) => <DateTime date={info.getValue() as Date} />,
		},
	];
	return updateAccess || deleteAccess
		? columns.concat([
				{
					accessorKey: 'actions',
					header: 'Actions',
					enableColumnFilter: false,
					enableSorting: false,
					enableHiding: false,
					cell: (info) => <TableCellAction info={info} />,
				},
			])
		: columns;
};

export default useDefaultColumns;
