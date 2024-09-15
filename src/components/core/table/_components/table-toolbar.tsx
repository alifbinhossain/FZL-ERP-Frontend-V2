'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { CirclePlus, RefreshCw } from 'lucide-react';
import useTable from '@/hooks/useTable';
import { usePage } from '@/hooks';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { TableFacetedFilter } from './table-faceted-filter';
import { TableViewOptions } from './table-view-options';

export function TableToolbar() {
	const { createAccess } = usePage();
	const { table, handleCreate, handleRefetch } = useTable();

	const isFiltered = table.getState().columnFilters.length > 0;

	return (
		<div className='flex items-center justify-between'>
			<div className='flex flex-1 items-center space-x-2'>
				<Input
					placeholder='Filter tasks...'
					value={
						(table
							.getColumn('email')
							?.getFilterValue() as string) ?? ''
					}
					onChange={(event) =>
						table
							.getColumn('email')
							?.setFilterValue(event.target.value)
					}
					className='h-8 w-[150px] lg:w-[250px]'
				/>

				<TableViewOptions table={table} />

				{table.getColumn('status') && (
					<TableFacetedFilter
						column={table.getColumn('status')}
						title='Status'
						options={[]}
					/>
				)}

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
				{handleRefetch && (
					<Button
						variant={'outline'}
						size={'icon'}
						onClick={handleRefetch}>
						<RefreshCw className='size-4' />
					</Button>
				)}
				{createAccess && (
					<Button onClick={handleCreate} variant='accent' size={'sm'}>
						<CirclePlus className='mr-2 size-4' />
						New
					</Button>
				)}
			</div>
		</div>
	);
}
