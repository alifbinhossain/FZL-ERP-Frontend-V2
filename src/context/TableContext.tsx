import { createContext, useMemo, useState } from 'react';
import {
	ColumnDef,
	ColumnFiltersState,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	Table,
	useReactTable,
	VisibilityState,
} from '@tanstack/react-table';

import { Table as DataTable } from '@/components/core/table';
import { TableRowSelection } from '@/components/core/table/_components/table-row-selection';
import useDefaultColumns from '@/components/core/table/_helpers/useDefaultColumns';

interface ITableContext<TData> {
	title: string;
	subtitle?: string;
	table: Table<TData>;
	isLoading?: boolean;
	handleCreate?: () => void;
	handleUpdate?: (id: number) => void;
	handleDelete?: (id: number) => void;
	handleRefetch?: () => void;
	handleDeleteAll?: () => void;
}

export const TableContext = createContext({} as ITableContext<any>);

interface ITableProviderProps<TData, TValue> {
	title: string;
	subtitle?: string;
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	isLoading?: boolean;
	enableRowSelection?: boolean;
	enableDefaultColumns?: boolean;
	handleCreate?: () => void;
	handleUpdate?: (id: number) => void;
	handleDelete?: (id: number) => void;
	handleRefetch?: () => void;
	handleDeleteAll?: () => void;
}

function TableProvider<TData, TValue>({
	title,
	subtitle,
	columns,
	data,
	isLoading,
	enableRowSelection = true,
	enableDefaultColumns = true,
	handleCreate,
	handleUpdate,
	handleDelete,
	handleRefetch,
	handleDeleteAll,
}: ITableProviderProps<TData, TValue>) {
	const tableData = useMemo(() => data, [data]);

	const tableColumns = useMemo(() => columns, [columns]);
	const defaultColumns = useDefaultColumns<TData, TValue>();
	const renderColumns = enableDefaultColumns
		? tableColumns.concat(defaultColumns)
		: tableColumns;

	const [rowSelection, setRowSelection] = useState({});
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
		{}
	);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = useState<SortingState>([]);

	const table = useReactTable({
		data: tableData,
		columns: enableRowSelection
			? [TableRowSelection<TData, TValue>(), ...renderColumns]
			: renderColumns,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters,
		},
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
	});

	const value = useMemo(
		(): ITableContext<TData> => ({
			title,
			subtitle,
			isLoading,
			table,
			handleCreate,
			handleUpdate,
			handleDelete,
			handleRefetch,
			handleDeleteAll,
		}),
		[
			title,
			subtitle,
			isLoading,
			table,
			handleCreate,
			handleUpdate,
			handleDelete,
			handleRefetch,
			handleDeleteAll,
		]
	);
	return (
		<TableContext.Provider value={value}>
			<DataTable />
		</TableContext.Provider>
	);
}

export default TableProvider;
