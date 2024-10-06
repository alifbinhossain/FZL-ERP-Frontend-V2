import React from 'react';

import DataTableTitle from '@/components/core/data-table/data-table-title';

import { testEntryColumns } from '../../_config/columns'; // TODO: update columns to match the data type
import { ITestDetails } from '../../_config/columns/columns.type'; // TODO: update data type

const EntryTable: React.FC<{ data: ITestDetails }> = ({ data }) => {
	const columns = testEntryColumns(); // TODO: update columns to match the data type

	return (
		<DataTableTitle
			title='Entries'
			columns={columns}
			data={data.entries || []}
		/>
	);
};

export default EntryTable;
