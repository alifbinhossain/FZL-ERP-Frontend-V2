import { useMemo } from 'react';
import { Column } from '@tanstack/react-table';

import DebouncedInput from '@/components/ui/debounce-input';

interface IStringFilterProps<TData, TValue> {
	column: Column<TData, TValue>;
	showLabel?: boolean;
}

function StringFilter<TData, TValue>({
	column,
	showLabel,
}: IStringFilterProps<TData, TValue>) {
	const columnFilterValue = column.getFilterValue();

	const sortedUniqueValues = useMemo(
		() => Array.from(column.getFacetedUniqueValues().keys()).sort(),
		[column]
	);

	return (
		<div className='flex flex-col gap-1'>
			{showLabel && (
				<label className='text-sm font-medium capitalize'>
					{column.columnDef.header?.toString() ||
						column.id?.split('_').join(' ')}
				</label>
			)}
			<datalist id={column.id + 'list'}>
				{sortedUniqueValues.slice(0, 10).map((value, index) => (
					<option
						key={
							value !== null && value !== undefined
								? value
								: `option-${index}`
						}
						value={value}
					/>
				))}
			</datalist>
			<DebouncedInput
				className='w-full rounded border'
				onChange={(value) => column.setFilterValue(value)}
				placeholder={`Search...`}
				type='text'
				list={column.id + 'list'}
				value={(columnFilterValue ?? '') as string}
			/>
		</div>
	);
}

export default StringFilter;
