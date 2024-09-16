import { flexRender } from '@tanstack/react-table';
import useTable from '@/hooks/useTable';

import {
	TableBody,
	TableCell,
	Table as TableComponent,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { TableColumnHeader } from './_components/table-column-header';
import { TablePagination } from './_components/table-pagination';
import TableSkeleton from './_components/table-skeleton';
import { TableToolbar } from './_components/table-toolbar';
import { getCommonPinningStyles } from './_helpers/getCommonPinningStyle';

export function DataTable() {
	const { table, isLoading } = useTable();
	return (
		<div className='space-y-4'>
			<TableToolbar />
			<div className='overflow-hidden rounded-md border border-secondary/10'>
				<TableComponent>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									const content =
										header.column.columnDef.header;
									return (
										<TableHead
											key={header.id}
											colSpan={header.colSpan}
											style={{
												...getCommonPinningStyles({
													column: header.column,
													isHeader: true,
												}),
											}}>
											{header.isPlaceholder
												? null
												: flexRender(
														typeof content ===
															'string' ? (
															<TableColumnHeader
																column={
																	header.column
																}
															/>
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
					<TableBody className='divide-y-[1px] divide-secondary/10'>
						{isLoading ? (
							<TableSkeleton
								columnsLength={table.getAllColumns().length}
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
											style={{
												...getCommonPinningStyles({
													column: cell.column,
												}),
											}}>
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
									colSpan={table.getAllColumns().length}
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
	);
}
