import { createContext, useMemo, useState } from 'react';
import { IResponse } from '@/types';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import {
	ColumnDef,
	ColumnFiltersState,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	Row,
	SortingState,
	Table,
	useReactTable,
	VisibilityState,
} from '@tanstack/react-table';
import { max, min } from 'date-fns';

import { DataTable } from '@/components/core/data-table';
import { TableRowSelection } from '@/components/core/data-table/_components/table-row-selection';
import { dateRange } from '@/components/core/data-table/_helpers/dateRange';
import useDefaultColumns from '@/components/core/data-table/_helpers/useDefaultColumns';

interface ITableContext<TData> {
	title: string;
	subtitle?: string;
	table: Table<TData>;
	isLoading?: boolean;
	handleCreate?: () => void;
	handleUpdate?: (row: Row<TData>) => void;
	handleDelete?: (row: Row<TData>) => void;
	handleRefetch?: (
		options?: RefetchOptions
	) => Promise<QueryObserverResult<IResponse<any>, Error>>;
	handleDeleteAll?: (rows: Row<TData>[]) => void;
	initialDateRange: [Date | string, Date | string];
}

export const TableContext = createContext({} as ITableContext<any>);

interface ITableProviderProps<TData, TValue> {
	title: string;
	subtitle?: string;
	children?: React.ReactNode;
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	isLoading?: boolean;
	enableRowSelection?: boolean;
	enableDefaultColumns?: boolean;
	handleCreate?: () => void;
	handleUpdate?: (row: Row<TData>) => void;
	handleDelete?: (row: Row<TData>) => void;
	handleRefetch?: (
		options?: RefetchOptions
	) => Promise<QueryObserverResult<IResponse<any>, Error>>;
	handleDeleteAll?: (rows: Row<TData>[]) => void;
}

function TableProvider<TData, TValue>({
	title,
	subtitle,
	children,
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
	const [sorting, setSorting] = useState<SortingState>([
		{
			id: 'created_at',
			desc: true,
		},
	]);

	const table = useReactTable({
		data: tableData,
		columns: enableRowSelection
			? [TableRowSelection<TData, TValue>(), ...renderColumns]
			: renderColumns,
		initialState: {
			columnPinning: { right: ['actions'] },
		},
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
		filterFns: {
			dateRange: (row, columnId, value) =>
				dateRange(row, columnId, value),
		},
	});

	const allDates: Date[] = [];
	const createdColumn = table.getColumn('created_at');
	const uniqueCreatedValues = createdColumn?.getFacetedUniqueValues();

	uniqueCreatedValues?.forEach((key, value) => {
		allDates.push(new Date(value));
	});

	const minDate = min(allDates);
	const maxDate = max(allDates);

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
			initialDateRange: [minDate, maxDate],
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
			minDate,
			maxDate,
		]
	);
	return (
		<TableContext.Provider value={value}>
			<DataTable />
			{children}
		</TableContext.Provider>
	);
}

export default TableProvider;
