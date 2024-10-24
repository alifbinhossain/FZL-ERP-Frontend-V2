import { format, isValid } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Calendar, CalendarProps } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';

import { Skeleton } from './skeleton';

const CalendarPopup: React.FC<
	CalendarProps & {
		selected: Date | undefined;
		onSelect: (date: Date | undefined) => void;
	}
> = ({ onSelect, selected }) => {
	const isValidDate = isValid(selected);

	if (!isValidDate) {
		return <Skeleton className='h-8 w-full' />;
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					type='button'
					variant={'gradient'}
					className={cn(
						'h-8 w-full text-left font-normal transition-none active:scale-100'
					)}>
					{selected
						? format(new Date(selected), 'MMM d, yyyy')
						: 'Select date'}
					{/* <CalendarIcon className='ml-auto h-4 w-4 opacity-50' /> */}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0' align='start'>
				<Calendar
					initialFocus
					mode='single'
					selected={selected}
					onSelect={onSelect}
					defaultMonth={selected}
				/>
			</PopoverContent>
		</Popover>
	);
};

export default CalendarPopup;
