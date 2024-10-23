import { format } from 'date-fns';

const formatDate = (date: Date) => format(date, 'yyyy-MM-dd HH:mm:ss');

const formatDateTable = (date: Date | string) =>
	format(new Date(date), 'dd/MM/yyyy');

export { formatDate, formatDateTable };
