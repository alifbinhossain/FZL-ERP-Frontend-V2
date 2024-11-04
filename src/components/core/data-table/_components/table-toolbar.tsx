import React, { useCallback } from 'react';
import { IToolbarOptions } from '@/types';
import { Cross2Icon } from '@radix-ui/react-icons';
import { CirclePlus, SearchIcon } from 'lucide-react';
import usePage from '@/hooks/usePage';
import useTable from '@/hooks/useTable';

import { Button } from '@/components/ui/button';
import DebouncedInput from '@/components/ui/debounce-input';
import { Separator } from '@/components/ui/separator';

import { cn } from '@/lib/utils';

import TableAllFilter from './table-all-filter';
import TableDateRange from './table-date-range';
import TableExportCSV from './table-export-csv';
import { TableFacetedFilter } from './table-faceted-filter';
import TableRefresh from './table-refresh';
import { TableRowDelete } from './table-row-delete';
import TableTitle from './table-title';
import { TableViewOptions } from './table-view-options';

// Interface for ToolbarComponent props
interface ToolbarComponentProps {
	option: IToolbarOptions;
	render: () => React.ReactNode;
}

/**
 * ToolbarComponent - Renders a toolbar item based on the provided option
 * @param option - The toolbar option to check
 * @param render - Function to render the toolbar item
 */
const ToolbarComponent: React.FC<ToolbarComponentProps> = React.memo(({ option, render }) => {
	const { toolbarOptions } = useTable();

	if (toolbarOptions?.includes(option) || toolbarOptions?.includes('all')) {
		return render();
	}
	return null;
});

ToolbarComponent.displayName = 'ToolbarComponent';

/**
 * TableToolbar - Main component for rendering the table toolbar
 */
export function TableToolbar() {
	const { createAccess } = usePage();
	const {
		title,
		subtitle,
		table,
		toolbarOptions,
		handleCreate,
		handleRefetch,
		globalFilterValue,
		facetedFilters,
		isEntry,
		start_date,
		end_date,
		onUpdate,
	} = useTable();

	const isFiltered = table.getState().columnFilters.length > 0;

	// Memoize the callback for resetting column filters
	const resetColumnFilters = useCallback(() => table.resetColumnFilters(), [table]);

	// Memoize the callback for setting global filter
	const setGlobalFilter = useCallback((value: string | number) => table.setGlobalFilter(value), [table]);

	/**
	 * Renders the left section of the toolbar
	 */
	const renderLeftSection = useCallback(
		() => (
			<div className='flex flex-1 items-center space-x-2'>
				<ToolbarComponent
					option='all-filter'
					render={() =>
						table.getAllColumns().filter((column) => column.getCanFilter()).length > 0 && <TableAllFilter />
					}
				/>
				<ToolbarComponent option='view' render={() => <TableViewOptions table={table} />} />
				<ToolbarComponent
					option='date-range'
					render={() => <TableDateRange start_date={start_date} end_date={end_date} onUpdate={onUpdate} />}
				/>
				<ToolbarComponent
					option='faceted-filter'
					render={() =>
						facetedFilters?.map((filter) => {
							const column = table.getColumn(filter.id);
							return column ? (
								<TableFacetedFilter
									key={filter.id}
									column={column}
									title={filter.title}
									options={filter.options}
								/>
							) : null;
						})
					}
				/>
				{isFiltered && (
					<Button
						aria-label='Reset filters'
						variant='outline-destructive'
						onClick={resetColumnFilters}
						className='h-8'>
						Reset
						<Cross2Icon className='size-4' />
					</Button>
				)}
				<Separator orientation='vertical' className='h-6' />

				<ToolbarComponent option='export-csv' render={() => <TableExportCSV />} />
			</div>
		),
		[table, facetedFilters, isFiltered, resetColumnFilters, start_date, end_date, onUpdate]
	);

	/**
	 * Renders the right section of the toolbar
	 */
	const renderRightSection = useCallback(
		() => (
			<div className='flex gap-4'>
				<TableRowDelete />
				<ToolbarComponent
					option='refresh'
					render={() => handleRefetch && <TableRefresh handleRefetch={handleRefetch} />}
				/>
				<ToolbarComponent
					option='new-entry'
					render={() =>
						createAccess && (
							<Button aria-label='Create new entry' onClick={handleCreate} variant='accent' size='sm'>
								<CirclePlus className='size-4' />
								New
							</Button>
						)
					}
				/>
			</div>
		),
		[handleRefetch, createAccess, handleCreate]
	);

	if (isEntry) {
		return (
			<div className='flex items-center justify-between overflow-hidden rounded-t-md bg-primary px-4 py-3'>
				<div className='flex items-center justify-between gap-4'>
					<TableTitle
						title={title}
						subtitle={subtitle}
						titleClassName={
							'text-2xl font-semibold capitalize leading-tight text-primary-foreground md:text-3xl'
						}
					/>
					{toolbarOptions === 'none' ? null : (
						<div className={cn('flex items-center justify-between')}>
							{renderLeftSection()}
							{renderRightSection()}
						</div>
					)}
				</div>{' '}
				<DebouncedInput
					icon={<SearchIcon className={cn('size-5 text-white/50')} />}
					value={globalFilterValue ?? ''}
					onChange={setGlobalFilter}
					className={cn('bg-gradient-accent h-10 w-full border-accent/10 lg:max-w-[300px]')}
					placeholder='Search...'
				/>
			</div>
		);
	}

	return (
		<div className={cn('mb-4 flex w-full flex-col overflow-hidden')}>
			<div
				className={cn(
					'mb-4 flex w-full flex-col justify-between gap-2 border-b pb-4 lg:flex-row lg:items-end'
				)}>
				<TableTitle title={title} subtitle={subtitle} />
				<DebouncedInput
					icon={<SearchIcon className={cn('size-5 text-secondary/50')} />}
					value={globalFilterValue ?? ''}
					onChange={setGlobalFilter}
					className={cn('h-10 w-full lg:max-w-[300px]')}
					placeholder='Search...'
				/>
			</div>
			{toolbarOptions === 'none' ? null : (
				<div className={cn('flex items-center justify-between')}>
					{renderLeftSection()}
					{renderRightSection()}
				</div>
			)}
		</div>
	);
}
