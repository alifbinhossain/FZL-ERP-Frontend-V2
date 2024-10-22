import React from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { DynamicFieldsProps } from '..';

interface IProps
	extends Pick<DynamicFieldsProps, 'handleAdd' | 'extraButtons' | 'title'> {
	children: React.ReactNode;
}

const DynamicFieldContainer: React.FC<IProps> = ({
	title,
	extraButtons,
	handleAdd,
	children,
}) => {
	return (
		<div className='overflow-hidden rounded-md shadow-sm'>
			<div className='flex items-center justify-between bg-primary py-2 pl-4 pr-2'>
				<h3 className='text-lg font-medium text-primary-foreground'>
					{title || 'Dynamic Fields'}
				</h3>

				<div className='flex items-center gap-2'>
					{extraButtons &&
						extraButtons.length > 0 &&
						extraButtons.map((button) => button)}

					{handleAdd && (
						<Button
							onClick={handleAdd}
							type='button'
							variant={'accent'}
							size={'xs'}
							className='gap-1 rounded bg-transparent bg-gradient-to-r from-accent/80 to-accent/70'>
							<Plus className='size-4' />
							New
						</Button>
					)}
				</div>
			</div>

			{children}
		</div>
	);
};

export default DynamicFieldContainer;
