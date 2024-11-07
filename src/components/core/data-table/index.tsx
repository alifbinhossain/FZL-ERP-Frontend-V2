import { useCallback, useMemo } from 'react';
import { flexRender } from '@tanstack/react-table';
import useTable from '@/hooks/useTable';

import { TableBody, TableCell, Table as TableComponent, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { cn } from '@/lib/utils';

import { TableColumnHeader } from './_components/column-header';
import { TablePagination } from './_components/pagination';
import TableSkeleton from './_components/skeleton';
import { TableToolbar } from './_components/toolbar';
import { getCommonPinningStyles } from './_helpers/getCommonPinningStyle';

function DataTable() {
	const { table, isLoading, isEntry } = useTable();
	const { getHeaderGroups, getRowModel, getAllColumns } = table;

	const renderTableBody = useCallback(() => {
		const colSpan = getAllColumns().length;
		const { rows } = getRowModel();
		const hasAnyRows = rows.length > 0;

		if (isLoading) {
			return <TableSkeleton colSpan={colSpan} />;
		}

		if (!hasAnyRows) {
			return (
				<TableRow>
					<TableCell colSpan={colSpan} className='h-24 animate-pulse text-center text-lg text-destructive'>
						No Results
					</TableCell>
				</TableRow>
			);
		}

		return rows.map((row) => (
			<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
				{row.getVisibleCells().map((cell) => (
					<TableCell
						key={cell.id}
						className='text-[0.75rem]'
						style={{
							...getCommonPinningStyles({
								column: cell.column,
							}),
						}}
					>
						{flexRender(cell.column.columnDef.cell, cell.getContext())}
					</TableCell>
				))}
			</TableRow>
		));
	}, [getAllColumns, getRowModel, isLoading]);

	const headerGroups = useMemo(() => getHeaderGroups(), [getHeaderGroups]);

	return (
		<div>
			<TableToolbar />
			<div className={cn('overflow-hidden border border-secondary/10', isEntry ? 'rounded-b-md' : 'rounded-md')}>
				<TableComponent>
					<TableHeader>
						{headerGroups.map(({ id, headers }) => (
							<TableRow key={id}>
								{headers.map((header) => {
									const content = header.column.columnDef.header;
									return (
										<TableHead
											key={header.id}
											colSpan={header.colSpan}
											style={{
												...getCommonPinningStyles({
													column: header.column,
													isHeader: true,
												}),
											}}
										>
											{header.isPlaceholder
												? null
												: flexRender(
														typeof content === 'string' ? (
															<TableColumnHeader column={header.column} />
														) : (
															content
														),
														header.getContext()
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody className='divide-y-[1px] divide-secondary/10'>{renderTableBody()}</TableBody>
				</TableComponent>

				<TablePagination />
			</div>
		</div>
	);
}

export default DataTable;
