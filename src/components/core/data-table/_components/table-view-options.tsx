'use client';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface TableViewOptionsProps<TData> {
	table: Table<TData>;
}

export function TableViewOptions<TData>({
	table,
}: TableViewOptionsProps<TData>) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='outline'
					size='sm'
					className='ml-auto hidden lg:flex'>
					<MixerHorizontalIcon className='size-4' />
					View
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-fit'>
				<DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{table
					.getAllColumns()
					.filter(
						(column) =>
							typeof column.accessorFn !== 'undefined' &&
							column.getCanHide()
					)
					.map((column) => {
						return (
							<DropdownMenuCheckboxItem
								key={column.id}
								className='capitalize'
								checked={column.getIsVisible()}
								onCheckedChange={(value) =>
									column.toggleVisibility(!!value)
								}>
								{column.id.split('_').join(' ')}
							</DropdownMenuCheckboxItem>
						);
					})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
