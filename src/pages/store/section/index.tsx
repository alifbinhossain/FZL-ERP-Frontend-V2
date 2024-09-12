import PageInfo from '@/utils/pageInfo';
import { useMaterialSection } from '../_const/query';
import { useEffect } from 'react';
import { useAccess } from '@/hooks';

export default function Index() {
	const { data, isLoading, url, deleteData } = useMaterialSection();
	const info = new PageInfo(
		'Store / Material Section',
		url,
		'store__section'
	);

	const haveAccess = useAccess('store__section');

	useEffect(() => {
		document.title = info.getTabName();
	}, []);

	return <></>;
}
