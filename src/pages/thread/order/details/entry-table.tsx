import React from 'react';
import useAccess from '@/hooks/useAccess';

import DataTableTitle from '@/components/core/data-table/data-table-title';

import { orderEntryColumns } from '../../_config/columns';
import { IOrderDetailsEntry } from '../../_config/columns/columns.type';

const EntryTable: React.FC<{ data: IOrderDetailsEntry[] }> = ({ data }) => {
	const pageAccess = useAccess('thread__order_info_in_details') as string[];
	const showPriceAccess = pageAccess.includes('show_price');

	console.log({
		showPriceAccess,
	});

	const columns = orderEntryColumns({ showPriceAccess });

	return (
		<DataTableTitle title='Entries' columns={columns} data={data || []} />
	);
};

export default EntryTable;
