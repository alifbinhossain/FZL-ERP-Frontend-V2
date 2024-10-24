import { DateRange } from '@/components/ui/date-range-picker';

const getDefaultDateRange = (): DateRange => {
	const startDate = new Date();
	const endDate = new Date();

	startDate.setDate(startDate.getDate() - 89);
	startDate.setHours(0, 0, 0, 0);
	endDate.setHours(23, 59, 59, 999);

	return {
		from: startDate,
		to: endDate,
	};
};

export default getDefaultDateRange;
