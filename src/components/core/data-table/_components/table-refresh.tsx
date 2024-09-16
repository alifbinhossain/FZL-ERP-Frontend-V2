import { useState } from 'react';
import { IResponse } from '@/types';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

import TooltipWrapper from '@/components/tooltip-wrapper';
import { Button } from '@/components/ui/button';

interface TableRefreshProps {
	handleRefetch: (
		options?: RefetchOptions
	) => Promise<QueryObserverResult<IResponse<any>, Error>>;
}
const TableRefresh: React.FC<TableRefreshProps> = ({ handleRefetch }) => {
	const [isFetching, setIsFetching] = useState(false);

	const handleClick = async () => {
		setIsFetching(true);
		toast.promise(handleRefetch, {
			finally: () => setIsFetching(false),
			loading: 'Refreshing...',
			success: 'Data refreshed successfully',
			error: 'Failed to refresh data',
			duration: 1500,
		});
	};
	return (
		<TooltipWrapper message='Refresh data'>
			<Button
				disabled={isFetching}
				variant={'outline'}
				size={'sm'}
				onClick={handleClick}>
				<RefreshCw className='size-4' />
				Refresh
			</Button>
		</TooltipWrapper>
	);
};

export default TableRefresh;
