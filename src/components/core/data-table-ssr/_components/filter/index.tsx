import { TableFilterProvider } from '@/context';
import { ITableFilter } from '@/context/TableFilterContext';
import { ITableFilterOptionSSR } from '@/types';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

import Footer from './footer';
import Input from './input';
import Select from './select';

function TableColumnFilter<T>({ option }: { option: ITableFilterOptionSSR<T> }) {
	const renderFilter = () => {
		switch (option.type) {
			case 'date-range':
				return <div className='flex items-center gap-2' />;
			case 'select':
				return <Select {...option} />;
			case 'radio':
				return <div className='flex items-center gap-2' />;
			case 'text':
				return <Input {...option} />;
			case 'checkbox':
				return <div className='flex items-center gap-2' />;
			default:
				return <div className='flex items-center gap-2' />;
		}
	};

	return (
		<div className='flex flex-col gap-2'>
			<Label>{option.label}</Label>
			{renderFilter()}
		</div>
	);
}

function TableFilter<T>({ options }: { options: ITableFilterOptionSSR<T>[] }) {
	const [searchParams] = useSearchParams();

	const defaultValues: ITableFilter[] = [];

	searchParams.forEach((value, key) => defaultValues.push({ name: key, value }));

	return (
		<TableFilterProvider defaultValues={defaultValues}>
			<Sheet>
				<SheetTrigger>
					<Button aria-label='Filters All Columns' variant='gradient' size='sm' className='hidden lg:flex'>
						<MixerHorizontalIcon className='size-4' />
						Filters
					</Button>
				</SheetTrigger>
				<SheetContent className='flex flex-col'>
					<SheetHeader className='border-b pb-2'>
						<SheetTitle className='flex items-center gap-2'>
							<MixerHorizontalIcon className='size-4' /> All Filters
						</SheetTitle>
						<SheetDescription className='sr-only'>
							This action cannot be undone. This will permanently delete your account and remove your data
							from our servers.
						</SheetDescription>
					</SheetHeader>

					<ScrollArea className='mt-4 flex-1'>
						<div className='flex flex-col gap-4'>
							{options.map((option, index) => (
								<TableColumnFilter key={index} option={option} />
							))}
						</div>
					</ScrollArea>

					<SheetFooter>
						<Footer />
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</TableFilterProvider>
	);
}

export default TableFilter;
