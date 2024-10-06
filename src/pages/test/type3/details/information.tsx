import React from 'react';
import { format } from 'date-fns';

import SectionContainer from '@/components/section-container';
import TableList, { ITableListItems } from '@/components/table-list';

import { ITestDetails } from '../../_config/columns/columns.type'; // TODO: update data type

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
				value: format(
					new Date(data.created_at),
					'dd/MM/yyyy - hh:mm a'
				),
			},
			{
				label: 'Updated At',
				value: format(
					new Date(data.updated_at),
					'dd/MM/yyyy - hh:mm a'
				),
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
