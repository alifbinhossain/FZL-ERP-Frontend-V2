import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

function useDateRange() {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());

	useEffect(() => {
		startDate.setDate(startDate.getDate() - 89);
		startDate.setHours(0, 0, 0, 0);
		endDate.setHours(23, 59, 59, 999);
	}, []);

	const onUpdate = ({ range }: { range: DateRange }) => {
		setStartDate(range?.from || new Date());
		setEndDate(range?.to || new Date());
	};

	// console.log({
	// 	startDate,
	// 	endDate,
	// });

	return {
		start_date: startDate,
		end_date: endDate,
		formatted_start_date: format(startDate, 'yyyy-MM-dd'),
		formatted_end_date: format(endDate, 'yyyy-MM-dd'),
		onUpdate,
	};
}

export default useDateRange;
