import { useEffect, useState } from 'react';
import { addDays, format } from 'date-fns';
import { DateRange } from 'react-day-picker';

function useDateRange() {
	const initialEndDate = new Date();
	const initialStartDate = addDays(initialEndDate || new Date(), -89);

	const [startDate, setStartDate] = useState(initialStartDate);
	const [endDate, setEndDate] = useState(initialEndDate);

	useEffect(() => {
		startDate.setHours(0, 0, 0, 0);
		endDate.setHours(23, 59, 59, 999);
	}, []);

	const onUpdate = ({ range }: { range: DateRange }) => {
		setStartDate(range?.from || new Date());
		setEndDate(range?.to || new Date());
	};

	return {
		start_date: startDate,
		end_date: endDate,
		formatted_start_date: format(startDate, 'yyyy-MM-dd') as string,
		formatted_end_date: format(endDate, 'yyyy-MM-dd') as string,
		onUpdate,
	};
}

export default useDateRange;
