import { createContext, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { IPagination, IPaginationQuery, IResponse } from '@/types';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { ColumnDef, getCoreRowModel, Row, Table, useReactTable, VisibilityState } from '@tanstack/react-table';
import { max, min } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { useSearchParams } from 'react-router-dom';

import DataTableSSR from '@/components/core/data-table-ssr';
import { TableRowSelection } from '@core/data-table/_components/row/selection';
import { dateRange } from '@core/data-table/_helpers/dateRange';
import { fuzzyFilter } from '@core/data-table/_helpers/fuzzyFilter';
import useDefaultColumns from '@core/data-table/_helpers/useDefaultColumns';

interface ITableContextSSR<TData> {
	title: string;
	subtitle?: string;
	pagination: IPagination;
	handleSearchParams: (params: Partial<IPaginationQuery>) => void;
	isEntry?: boolean;
	table: Table<TData>;
	isLoading?: boolean;
	handleCreate?: () => void;
	handleUpdate?: (row: Row<TData>) => void;
	handleDelete?: (row: Row<TData>) => void;
	handleRefetch?: (options?: RefetchOptions) => Promise<QueryObserverResult<IResponse<any>, Error>>;
	handleDeleteAll?: (rows: Row<TData>[]) => void;
	initialDateRange: [Date | string, Date | string];
	enableRowSelection?: boolean;
	enableDefaultColumns?: boolean;
	start_date?: Date | string;
	end_date?: Date | string;
	onUpdate?: ({ range }: { range: DateRange }) => void;
	onClear?: () => void;
	isClear?: boolean;
}

export const TableContextSSR = createContext({} as ITableContextSSR<any>);

interface ITableProviderProps<TData, TValue> {
	title: string;
	subtitle?: string;
	pagination: IPagination;
	isEntry?: boolean;
	children?: React.ReactNode;
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	isLoading?: boolean;
	enableRowSelection?: boolean;
	enableDefaultColumns?: boolean;
	handleCreate?: () => void;
	handleUpdate?: (row: Row<TData>) => void;
	handleDelete?: (row: Row<TData>) => void;
	handleRefetch?: (options?: RefetchOptions) => Promise<QueryObserverResult<IResponse<any>, Error>>;
	handleDeleteAll?: (rows: Row<TData>[]) => void;
	defaultVisibleColumns?: VisibilityState;
	start_date?: Date | string;
	end_date?: Date | string;
	onUpdate?: ({ range }: { range: DateRange }) => void;
	onClear?: () => void;
	isClear?: boolean;
}

function TableProviderSSR<TData, TValue>({
	title,
	subtitle,
	pagination,
	isEntry = false,
	children,
	columns,
	data,
	isLoading,
	enableRowSelection = false,
	enableDefaultColumns = true,
	handleCreate,
	handleUpdate,
	handleDelete,
	handleRefetch,
	handleDeleteAll,
	defaultVisibleColumns = {},
	start_date,
	end_date,
	onUpdate,
	onClear,
	isClear,
}: ITableProviderProps<TData, TValue>) {
	const [searchParams, setSearchParams] = useSearchParams();

	const [isMounted, setIsMounted] = useState(false);

	// react table hook, and other codes...
	const tableData = useMemo(() => data, [data]);
	const tableColumns = useMemo(() => columns, [columns]);
	const defaultColumns = useDefaultColumns<TData, TValue>();
	const renderColumns = enableDefaultColumns ? tableColumns.concat(defaultColumns) : tableColumns;

	const visibleColumns = renderColumns.filter((column) => !column.meta?.hidden);

	const [rowSelection, setRowSelection] = useState({});
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(defaultVisibleColumns);

	// Fix error on react table, when the table is not mounted
	useLayoutEffect(() => {
		setIsMounted(true);
	}, []);

	const handleSearchParams = useCallback(
		(params: Partial<IPaginationQuery>) => {
			searchParams.forEach((value, key) => {
				if (Object.keys(params).includes(key)) searchParams.delete(key);
			});
			Object.entries(params).forEach(([key, value]) => searchParams.append(key, String(value)));
			setSearchParams(searchParams);
		},
		[searchParams, setSearchParams]
	);

	const table = useReactTable({
		data: tableData,
		columns: enableRowSelection ? [TableRowSelection<TData, TValue>(), ...visibleColumns] : visibleColumns,
		initialState: {
			columnPinning: { right: ['actions'] },
		},
		state: {
			columnVisibility,
			rowSelection,
		},
		enableRowSelection: true,
		filterFns: {
			dateRange: (row, columnId, value) => dateRange(row, columnId, value),
			fuzzy: fuzzyFilter,
		},
		globalFilterFn: 'fuzzy',
		onRowSelectionChange: setRowSelection,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
	});

	const allDates: Date[] = [];

	const minDate = min(allDates);
	const maxDate = max(allDates);

	const value = useMemo<ITableContextSSR<TData>>(
		() => ({
			title,
			subtitle,
			pagination,
			isEntry,
			isLoading,
			table,
			handleSearchParams,
			handleCreate,
			handleUpdate,
			handleDelete,
			handleRefetch,
			handleDeleteAll,
			initialDateRange: [minDate, maxDate],
			enableRowSelection,
			enableDefaultColumns,
			start_date,
			end_date,
			onUpdate,
			onClear,
			isClear,
		}),
		[
			title,
			subtitle,
			pagination,
			isEntry,
			isLoading,
			table,
			handleSearchParams,
			handleCreate,
			handleUpdate,
			handleDelete,
			handleRefetch,
			handleDeleteAll,
			minDate,
			maxDate,
			enableRowSelection,
			enableDefaultColumns,
			start_date,
			end_date,
			onUpdate,
			onClear,
			isClear,
		]
	);

	// Fix error on react table, when the table is not mounted
	if (!isMounted) return null;

	return (
		<TableContextSSR.Provider value={value}>
			<DataTableSSR />
			{children}
		</TableContextSSR.Provider>
	);
}

export default TableProviderSSR;
