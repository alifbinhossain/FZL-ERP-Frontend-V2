import React from 'react';
import { format } from 'date-fns';

import SectionContainer from '@/components/section-container';
import TableList, { ITableListItems } from '@/components/table-list';

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
