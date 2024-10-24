import useTable from '@/hooks/useTable';

import { DateRangePicker } from '@/components/ui/date-range-picker';

const TableDateRange = () => {
	const { table, initialDateRange, date, setDate } = useTable();
	const column = table.getColumn('created_at');
	const columnFilterValue = column?.getFilterValue() as [Date, Date];

	const isDateParams = date && (date.from || date.to) ? true : false;

	return (
		<DateRangePicker
			initialDateFrom={
				isDateParams
					? date?.from
					: columnFilterValue?.[0] || initialDateRange[0]
			}
			initialDateTo={
				isDateParams
					? date?.to
					: columnFilterValue?.[1] || initialDateRange[1]
			}
			align={'center'}
			onUpdate={({ range }) => {
				if (date !== undefined) {
					setDate?.(range);
				} else {
					column?.setFilterValue((old: [Date, Date]) => [
						new Date(range.from),
						range.to ? new Date(range.to) : old[1],
					]);
				}
			}}
			showClear={isDateParams}
			onClear={() => {
				if (isDateParams) {
					setDate?.({
						from: undefined,
						to: undefined,
					});
				}
			}}
		/>
	);
};

export default TableDateRange;
