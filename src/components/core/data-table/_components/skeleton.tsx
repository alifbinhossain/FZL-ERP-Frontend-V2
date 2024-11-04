import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';

interface ITableSkeletonProps {
	columnsLength: number;
}

const TableSkeleton: React.FC<ITableSkeletonProps> = ({ columnsLength }) => {
	return Array.from({ length: 10 }).map((_, index) => (
		<TableRow key={index}>
			{Array.from({ length: columnsLength }).map((_, i) => (
				<TableCell key={i}>
					<Skeleton className='h-6 w-full rounded-md bg-base-300' />
				</TableCell>
			))}
		</TableRow>
	));
};

export default TableSkeleton;
