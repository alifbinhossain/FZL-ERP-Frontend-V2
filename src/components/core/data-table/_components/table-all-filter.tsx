import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import useTable from '@/hooks/useTable';

import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

import TableColumnFilter from './table-column-filter';

const TableAllFilter = () => {
	const { table } = useTable();

	const filteredColumns = table
		.getAllFlatColumns()
		.filter((column) => column.getCanFilter());

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					aria-label='Filters All Columns'
					variant='outline'
					size='sm'
					className='hidden lg:flex'>
					<MixerHorizontalIcon className='size-4' />
					Filters
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader className='border-b pb-2'>
					<SheetTitle className='flex items-center gap-2'>
						<MixerHorizontalIcon className='size-4' /> All Filters
					</SheetTitle>
					<SheetDescription className='sr-only'>
						This action cannot be undone. This will permanently
						delete your account and remove your data from our
						servers.
					</SheetDescription>
				</SheetHeader>

				<div className='mt-4 flex flex-col gap-4'>
					{filteredColumns.length > 0 &&
						filteredColumns.map((column) => (
							<TableColumnFilter
								key={column.id}
								showLabel
								column={column}
							/>
						))}
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default TableAllFilter;
