import { useState } from 'react';
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';

import {
	Table as TableComponent,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { TablePagination } from './_components/table-pagination';
import { TableNavbar } from './_components/table-nav';
import useDefaultColumns from './_helpers/useDefaultColumns';
import { TableProvider } from '@/context';
import TableSkeleton from './_components/table-skeleton';

interface TableProps<TData, TValue> {
	title: string;
	subtitle?: string;
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	isLoading?: boolean;
	enableDefaultColumns?: boolean;
	handleCreate?: () => void;
	handleUpdate?: (id: number) => void;
	handleDelete?: (id: number) => void;
	handleRefetch?: () => void;
}

export function Table<TData, TValue>({
	title,
	subtitle,
	columns,
	data,
	isLoading = false,
	enableDefaultColumns = true,
	handleCreate,
	handleUpdate,
	handleDelete,
	handleRefetch,
}: TableProps<TData, TValue>) {
	const defaultColumns = useDefaultColumns<TData, TValue>();
	const [rowSelection, setRowSelection] = useState({});
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
		{}
	);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = useState<SortingState>([]);

	const renderColumns = enableDefaultColumns
		? columns.concat(defaultColumns)
		: columns;

	const table = useReactTable({
		data,
		columns: renderColumns,
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

	return (
		<TableProvider
			title={title}
			subtitle={subtitle}
			table={table}
			handleCreate={handleCreate}
			handleUpdate={handleUpdate}
			handleDelete={handleDelete}
			handleRefetch={handleRefetch}>
			<div className='space-y-4'>
				<TableNavbar />
				<div className='overflow-hidden rounded-md border border-secondary/10'>
					<TableComponent>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead
												key={header.id}
												colSpan={header.colSpan}>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column
																.columnDef
																.header,
															header.getContext()
														)}
											</TableHead>
										);
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody className='divide-y-[1px] divide-secondary/10'>
							{isLoading ? (
								<TableSkeleton
									columnsLength={renderColumns.length}
								/>
							) : table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={
											row.getIsSelected() && 'selected'
										}>
										{row.getVisibleCells().map((cell) => (
											<TableCell
												key={cell.id}
												className=''>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={renderColumns.length}
										className='h-24 text-center'>
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</TableComponent>
				</div>
				<TablePagination />
			</div>
		</TableProvider>
	);
}
