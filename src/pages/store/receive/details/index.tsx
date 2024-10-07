import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { IReceiveDetails } from '../../_config/columns/columns.type';
import { usePurchaseDetailsByUUID } from '../../_config/query';
import EntryTable from './entry-table';
import Information from './information';

const DetailsPage = () => {
	const { id } = useParams();
	const { data, isLoading } = usePurchaseDetailsByUUID<IReceiveDetails>(
		id as string
	);

	useEffect(() => {
		document.title = 'Receive Details';
	}, []);

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className='space-y-8'>
			<Information data={data as IReceiveDetails} />
			<EntryTable data={data as IReceiveDetails} />
		</div>
	);
};

export default DetailsPage;
