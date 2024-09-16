import useTable from '@/hooks/useTable';

import TableTitle from './table-title';
import { TableToolbar } from './table-toolbar';

export function TableNavbar() {
	const { title, subtitle } = useTable();
	return (
		<div className='mb-4 flex w-full flex-col overflow-hidden'>
			<div className='mb-4 flex w-full flex-col justify-between gap-2 border-b pb-4 lg:flex-row lg:items-end'>
				<TableTitle title={title} subtitle={subtitle} />
			</div>

			<TableToolbar />
		</div>
	);
}
