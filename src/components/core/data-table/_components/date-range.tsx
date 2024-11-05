import { DateRangePicker } from '@/components/ui/date-range-picker';

import { TTableDateRange } from '../types';

const TableDateRange = ({ start_date, end_date, onUpdate }: TTableDateRange) => {
	return (
		<DateRangePicker
			initialDateFrom={start_date}
			initialDateTo={end_date}
			align={'center'}
			onUpdate={({ range }) => {
				if (!onUpdate) return;
				onUpdate({ range });
			}}
		/>
	);
};

export default TableDateRange;
