import { cn } from '@/lib/utils';

interface TableTitleProps {
	title: string;
	subtitle?: string;
	disableSubtitle?: boolean;
	titleClassName?: string;
	subtitleClassName?: string;
}

const TableTitle: React.FC<TableTitleProps> = ({
	title,
	subtitle,
	disableSubtitle,
	titleClassName,
	subtitleClassName,
}) => {
	return (
		<div className='flex items-start justify-between gap-2 md:justify-start'>
			<div className='flex flex-col'>
				<h1
					className={cn(
						'text-xl font-semibold capitalize leading-tight text-primary md:text-2xl',
						titleClassName
					)}>
					{title}
				</h1>
				{!disableSubtitle && (
					<p
						className={cn(
							'mt-0.5 text-sm capitalize text-secondary',
							subtitleClassName
						)}>
						{subtitle || 'See all records in one place'}
					</p>
				)}
			</div>
		</div>
	);
};

export default TableTitle;
