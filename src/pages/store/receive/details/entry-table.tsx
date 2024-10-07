import React from 'react';

import DataTableTitle from '@/components/core/data-table/data-table-title';

import { receiveEntryColumns } from '../../_config/columns';
import { IReceiveDetails } from '../../_config/columns/columns.type';

const EntryTable: React.FC<{ data: IReceiveDetails }> = ({ data }) => {
	const columns = receiveEntryColumns();

	return (
		<DataTableTitle
			title='Entries'
			columns={columns}
			data={data.purchase || []}
		/>
	);
};

export default EntryTable;
