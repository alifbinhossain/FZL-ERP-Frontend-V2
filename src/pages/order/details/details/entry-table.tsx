import React from 'react';
import { testEntryColumns } from '@/pages/template/_config/columns'; // TODO: update columns to match the data type

import { ITestDetails } from '@/pages/template/_config/columns/columns.type'; // TODO: update data type

import DataTableEntry from '@core/data-table/entry';

const EntryTable: React.FC<{ data: ITestDetails }> = ({ data }) => {
	const columns = testEntryColumns(); // TODO: update columns to match the data type

	return <DataTableEntry title='Entries' columns={columns} data={data.entries || []} />;
};

export default EntryTable;
