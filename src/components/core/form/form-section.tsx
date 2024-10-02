import React from 'react';

import { cn } from '@/lib/utils';

interface IFormSectionProps {
	title?: string;
	children: React.ReactNode;
	className?: string;
}

const FormSection: React.FC<IFormSectionProps> = ({
	children,
	className,
	title,
}) => {
	if (title) {
		return (
			<div className='overflow-hidden rounded-md shadow-sm'>
				<h3 className='bg-primary px-4 py-2 text-lg font-medium text-primary-foreground'>
					{title}
				</h3>
				<div
					className={cn(
						'grid grid-cols-1 gap-2.5 rounded-b-md border bg-base p-4 md:grid-cols-2 md:gap-4',
						className
					)}>
					{children}
				</div>
			</div>
		);
	}
	return (
		<div
			className={cn(
				'grid grid-cols-1 gap-2.5 rounded-md border bg-base p-4 shadow-sm md:grid-cols-2 md:gap-4',
				className
			)}>
			{children}
		</div>
	);
};

export default FormSection;
