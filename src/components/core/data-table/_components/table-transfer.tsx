import { CellContext } from '@tanstack/react-table';
import { Repeat } from 'lucide-react';

import { Button, ButtonProps } from '@/components/ui/button';

interface TableTransferProps<TData, TValue> extends ButtonProps {
	info: CellContext<TData, TValue>;
}

function TableTransfer<TData, TValue>({
	info,
	onClick,
	...props
}: TableTransferProps<TData, TValue>) {
	return (
		<Button
			variant={'accent'}
			size={'icon'}
			className='rounded-full'
			onClick={onClick}
			{...props}>
			<Repeat className='size-4' />
		</Button>
	);
}

export default TableTransfer;
