import React from 'react';

import SectionContainer from '@/components/others/section-container';
import TableList, { ITableListItems } from '@/components/others/table-list';

import '@/utils/formatDate';

import { formatDateTable } from '@/utils/formatDate';

import { IReceiveDetails } from '../../_config/columns/columns.type';

const Information: React.FC<{ data: IReceiveDetails }> = ({ data }) => {
	const renderItems = (): ITableListItems => {
		return [
			{
				label: 'Invoice Number',
				value: data.purchase_id,
			},
			{ label: 'Vendor', value: data.vendor_name },
			{ label: 'Challan Number', value: data.challan_number },
			{ label: 'Created By', value: data.created_by_name },
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
