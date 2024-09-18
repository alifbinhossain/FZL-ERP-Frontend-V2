import { useMemo } from 'react';
import { Column } from '@tanstack/react-table';
import { max, min } from 'date-fns';

import { DateRangePicker } from '@/components/ui/date-range-picker';

interface IDateFilterProps<TData, TValue> {
	column: Column<TData, TValue>;
	showLabel?: boolean;
}

function DateFilter<TData, TValue>({
	column,
	showLabel,
}: IDateFilterProps<TData, TValue>) {
	const columnFilterValue = column.getFilterValue() as [Date, Date];

	const allDates: Date[] = useMemo(
		() =>
			Array.from(column.getFacetedUniqueValues().keys()).map(
				(e) => new Date(e)
			),
		[column]
	);

	const minDate = min(allDates);
	const maxDate = max(allDates);

	return (
		<div className='flex flex-col gap-1'>
			{showLabel && (
				<label className='text-sm font-medium capitalize'>
					{column.id?.split('_').join(' ')}
				</label>
			)}
			<DateRangePicker
				initialDateFrom={columnFilterValue?.[0] || minDate}
				initialDateTo={columnFilterValue?.[1] || maxDate}
				align={'start'}
				onUpdate={({ range }) => {
					column?.setFilterValue((old: [Date, Date]) => [
						new Date(range.from),
						range.to ? new Date(range.to) : old[1],
					]);
				}}
			/>
		</div>
	);
}

export default DateFilter;
