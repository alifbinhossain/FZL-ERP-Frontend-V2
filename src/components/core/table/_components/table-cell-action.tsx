import { Button } from '@/components/ui/button';
import { usePage } from '@/hooks';
import useTable from '@/hooks/useTable';
import { CellContext } from '@tanstack/react-table';
import { SquarePen, Trash2 } from 'lucide-react';

interface ITableCellActionProps<TData, TValue> {
	info: CellContext<TData, TValue>;
}

const TableCellAction: React.FC<ITableCellActionProps<any, any>> = ({
	info,
}) => {
	const { updateAccess, deleteAccess } = usePage();
	const { handleUpdate, handleDelete } = useTable();

	return (
		<div className='flex w-fit items-center justify-evenly gap-4'>
			{updateAccess && (
				<Button
					onClick={() => handleUpdate?.(info.row.index)}
					size={'icon'}
					variant={'outline'}
					className='rounded-full'>
					<SquarePen className='size-4' />
				</Button>
			)}
			{deleteAccess && (
				<Button
					onClick={() => handleDelete?.(info.row.index)}
					size={'icon'}
					variant={'destructive'}
					className='rounded-full'>
					<Trash2 className='size-4' />
				</Button>
			)}
		</div>
	);
};

export default TableCellAction;
