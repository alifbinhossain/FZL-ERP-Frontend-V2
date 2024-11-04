import { DateRange } from 'react-day-picker';

import { DateRangePicker } from '@/components/ui/date-range-picker';

type TTableDateRange = {
	start_date: Date | string | undefined;
	end_date: Date | string | undefined;
	onUpdate: ({ range }: { range: DateRange }) => void;
};

const TableDateRange = ({ start_date, end_date, onUpdate }: TTableDateRange) => {
	return (
		<DateRangePicker
			initialDateFrom={start_date}
			initialDateTo={end_date}
			align={'center'}
			onUpdate={({ range }) => {
				onUpdate({ range }) ;
			}}
		/>
	);
};

export default TableDateRange;
