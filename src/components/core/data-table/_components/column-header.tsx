import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon, EyeNoneIcon } from '@radix-ui/react-icons';
import { ListFilter, Pin, PinOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { cn } from '@/lib/utils';

import { TableColumnHeaderProps } from '../types';
import TableColumnFilter from './filter/column';

export function TableColumnHeader<TData, TValue>({ column, className, isSSR }: TableColumnHeaderProps<TData, TValue>) {
	const title = column.columnDef.header as string;

	if (!column.getCanSort()) {
		return <div className={cn(className)}>{title}</div>;
	}

	return (
		<div className={cn('flex items-center', className)}>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Button
						aria-label='Sort Column'
						variant='ghost'
						size='sm'
						className='data-[state=open]:bg-base-300 -ml-3 h-7 active:scale-100'
					>
						<span>{title}</span>
						{column.getIsSorted() === 'desc' ? (
							<ArrowDownIcon className='size-4' />
						) : column.getIsSorted() === 'asc' ? (
							<ArrowUpIcon className='size-4' />
						) : (
							<CaretSortIcon className='size-4' />
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='start'>
					{!isSSR && (
						<>
							<DropdownMenuItem onClick={() => column.toggleSorting(false)}>
								<ArrowUpIcon className='text-muted-foreground/70 mr-2 size-3.5' />
								Asc
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => column.toggleSorting(true)}>
								<ArrowDownIcon className='text-muted-foreground/70 mr-2 size-3.5' />
								Desc
							</DropdownMenuItem>

							<DropdownMenuSeparator />
						</>
					)}

					{column.getCanPin() && (
						<DropdownMenuItem
							onClick={() => {
								if (column.getIsPinned() === 'left') {
									column.pin(false);
								} else {
									column.pin('left');
								}
							}}
						>
							{column.getIsPinned() === 'left' ? (
								<PinOff className='text-muted-foreground/70 mr-2 size-3.5' />
							) : (
								<Pin className={'text-muted-foreground/70 mr-2 size-3.5'} />
							)}
							<span>{column.getIsPinned() === 'left' ? 'Unpin' : 'Pin to left'}</span>
						</DropdownMenuItem>
					)}

					{column.getCanHide() && (
						<DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
							<EyeNoneIcon className='text-muted-foreground/70 mr-2 size-3.5' />
							Hide
						</DropdownMenuItem>
					)}
				</DropdownMenuContent>
			</DropdownMenu>

			{column.getCanFilter() ? (
				<Popover>
					<PopoverTrigger>
						<Button aria-label='Column Filter' variant='ghost' size={'icon'}>
							<ListFilter className='size-4' />
						</Button>
					</PopoverTrigger>
					<PopoverContent className='bg-background w-fit p-2'>
						<TableColumnFilter column={column} />
					</PopoverContent>
				</Popover>
			) : null}
		</div>
	);
}
