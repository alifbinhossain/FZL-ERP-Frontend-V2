'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { CirclePlus } from 'lucide-react';
import useTable from '@/hooks/useTable';
import { usePage } from '@/hooks';

import { Button } from '@/components/ui/button';
import DebouncedInput from '@/components/ui/debounce-input';
import { Input } from '@/components/ui/input';

import TableDateRange from './tabel-date-range';
import { TableFacetedFilter } from './table-faceted-filter';
import TableRefresh from './table-refresh';
import { TableRowDelete } from './table-row-delete';
import TableTitle from './table-title';
import { TableViewOptions } from './table-view-options';

export function TableToolbar() {
	const { createAccess } = usePage();
	const {
		title,
		subtitle,
		table,
		handleCreate,
		handleRefetch,
		globalFilterValue,
		facetedFilters,
	} = useTable();

	const isFiltered = table.getState().columnFilters.length > 0;

	return (
		<div className='mb-4 flex w-full flex-col overflow-hidden'>
			<div className='mb-4 flex w-full flex-col justify-between gap-2 border-b pb-4 lg:flex-row lg:items-end'>
				<TableTitle title={title} subtitle={subtitle} />
			</div>
			<div className='flex items-center justify-between'>
				<div className='flex flex-1 items-center space-x-2'>
					<DebouncedInput
						value={globalFilterValue ?? ''}
						onChange={(value) =>
							table.setGlobalFilter(String(value))
						}
						className='h-8 w-full max-w-[200px] lg:w-[250px]'
						placeholder='Search...'
					/>
					{/* <Input
					placeholder='Filter tasks...'
					value={
						(table.getColumn('')?.getFilterValue() as string) ?? ''
					}
					onChange={(event) =>
						table
							.getColumn('email')
							?.setFilterValue(event.target.value)
					}
					className='h-8 w-[150px] lg:w-[250px]'
				/> */}
					<TableDateRange />
					<TableViewOptions table={table} />

					{facetedFilters &&
						facetedFilters?.length > 0 &&
						facetedFilters.map((filter) => {
							if (table.getColumn(filter.id)) {
								return (
									<TableFacetedFilter
										column={table.getColumn(filter.id)}
										title={filter.title}
										options={filter.options}
									/>
								);
							} else return null;
						})}

					{isFiltered && (
						<Button
							variant='ghost'
							onClick={() => table.resetColumnFilters()}
							className='h-8 px-2 lg:px-3'>
							Reset
							<Cross2Icon className='ml-2 size-4' />
						</Button>
					)}
				</div>

				<div className='flex gap-4'>
					<TableRowDelete />

					{handleRefetch && (
						<TableRefresh handleRefetch={handleRefetch} />
					)}

					{createAccess && (
						<Button
							onClick={handleCreate}
							variant='accent'
							size={'sm'}>
							<CirclePlus className='size-4' />
							New
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
