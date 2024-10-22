import React from 'react';
import { Check, X } from 'lucide-react';

import { Button } from '../ui/button';

const StatusButton: React.FC<{ value: number }> = ({ value = 0 }) => {
	return (
		<Button
			className='size-6 rounded-full'
			size={'icon'}
			variant={value === 0 ? 'destructive' : 'accent'}>
			{value === 0 ? (
				<X className='size-4' />
			) : (
				<Check className='size-4' />
			)}
		</Button>
	);
};

export default StatusButton;
