import React from 'react';
import { ITestDetails } from '@/pages/template/_config/columns/columns.type';

import SectionContainer from '@/components/others/section-container';
import TableList, { ITableListItems } from '@/components/others/table-list';

import { formatDateTable } from '@/utils/formatDate';

// TODO: update data type

const Information: React.FC<{ data: ITestDetails }> = ({ data }) => {
	// TODO: update the renderItems to match the data type
	const renderItems = (): ITableListItems => {
		return [
			{
				label: 'Name',
				value: data.name,
			},
			{ label: 'Stock', value: data.stock },
			{ label: 'UUID', value: data.uuid },
			{
				label: 'Created At',
				value: formatDateTable(data.created_at),
			},
			{
				label: 'Updated At',
				value: formatDateTable(data.updated_at),
			},
			{ label: 'Remarks', value: data.remarks },
		];
	};

	return (
		<SectionContainer title={'Information'}>
			<TableList items={renderItems()} />
		</SectionContainer>
	);
};

export default Information;
