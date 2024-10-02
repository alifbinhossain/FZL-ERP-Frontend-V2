import { useTable } from '@/hooks';

import { DateRangePicker } from '@/components/ui/date-range-picker';

const TableDateRange = () => {
	const { table, initialDateRange } = useTable();
	const column = table.getColumn('created_at');
	const columnFilterValue = column?.getFilterValue() as [Date, Date];

	return (
		<DateRangePicker
			initialDateFrom={columnFilterValue?.[0] || initialDateRange[0]}
			initialDateTo={columnFilterValue?.[1] || initialDateRange[1]}
			align={'center'}
			onUpdate={({ range }) => {
				column?.setFilterValue((old: [Date, Date]) => [
					new Date(range.from),
					range.to ? new Date(range.to) : old[1],
				]);
			}}
		/>
	);
};

export default TableDateRange;
