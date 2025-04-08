'use client';

import * as React from 'react';
import { format, isValid } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { cn } from '@/lib/utils';

interface IProps {
	selected: Date;
	onSelect: (date: Date) => void;
	disableIcon?: boolean;
	className?: string;
	size?: 'sm' | 'lg' | 'default' | 'xs' | 'icon' | null | undefined;
}

const SingleDatePicker: React.FC<IProps> = ({ selected, onSelect, disableIcon = false, className, size = 'sm' }) => {
	if (!selected || !isValid(selected)) return;

	console.log({
		selected,
	});

	return (
		<Popover>
			<PopoverTrigger>
				<Button
					size={size}
					variant={'outline'}
					className={cn(
						'max-w-fit min-w-[140px] justify-start text-left font-normal transition-none active:scale-100',
						!selected && 'text-muted-foreground',
						className
					)}
				>
					{!disableIcon && <CalendarIcon className='size-5' />}
					{selected ? format(selected, 'MMM d, y') : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0'>
				<Calendar
					mode='single'
					selected={selected}
					defaultMonth={selected}
					onSelect={(date) => {
						if (!date) return;
						onSelect(date);
					}}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
};

export default SingleDatePicker;
