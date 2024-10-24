import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

function addDateParams(url: string, params: DateRange) {
	if (!params || !params.from || !params.to) return url;

	return `${url}?start_date=${format(params.from, 'yyyy-MM-dd')}&end_date=${format(
		params.to,
		'yyyy-MM-dd'
	)}`;
}

export default addDateParams;
