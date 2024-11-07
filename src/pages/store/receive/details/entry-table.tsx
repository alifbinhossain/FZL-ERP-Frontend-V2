import React from 'react';

import DataTableEntry from '@core/data-table/entry';

import { receiveEntryColumns } from '../../_config/columns';
import { IReceiveDetails } from '../../_config/columns/columns.type';

const EntryTable: React.FC<{ data: IReceiveDetails }> = ({ data }) => {
	const columns = receiveEntryColumns();

	return <DataTableEntry title='Entries' columns={columns} data={data.purchase || []} />;
};

export default EntryTable;
