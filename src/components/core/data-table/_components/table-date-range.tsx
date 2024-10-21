import useDateRange from '@/hooks/useDateRange';
import useTable from '@/hooks/useTable';

import { DateRangePicker } from '@/components/ui/date-range-picker';

const TableDateRange = () => {
	const { table, initialDateRange } = useTable();
	const column = table.getColumn('created_at');
	const columnFilterValue = column?.getFilterValue() as [Date, Date];
	const { start_date, end_date, onUpdate } = useDateRange();

	return (
		<DateRangePicker
			// initialDateFrom={columnFilterValue?.[0] || initialDateRange[0]}
			// initialDateTo={columnFilterValue?.[1] || initialDateRange[1]}
			initialDateFrom={start_date}
			initialDateTo={end_date}
			align={'center'}
			onUpdate={({ range }) => {
				console.log({
					range,
				});

				onUpdate({ range });

				// column?.setFilterValue((old: [Date, Date]) => [
				// 	new Date(range.from),
				// 	range.to ? new Date(range.to) : old[1],
				// ]);
			}}
		/>
	);
};

export default TableDateRange;
