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

import { TableNavbar } from './_components/table-nav';
import { TablePagination } from './_components/table-pagination';
import TableSkeleton from './_components/table-skeleton';

export function Table() {
	const { table, isLoading } = useTable();
	return (
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
														header.column.columnDef
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
										<TableCell key={cell.id} className=''>
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
