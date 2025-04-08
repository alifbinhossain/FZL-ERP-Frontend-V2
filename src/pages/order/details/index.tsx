import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProviderSSR } from '@/context';
import { IPaginationQuery } from '@/types';
import { Row } from '@tanstack/react-table';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { orderDetailsColumns } from '../_config/columns';
import { orderDetailsFilters } from '../_config/columns/filter';
import { IOrderDetails } from '../_config/columns/type';
import { useOrderDetails2 } from '../_config/query';

const DeleteModal = lazy(() => import('@core/modal/delete'));
const DeleteAllModal = lazy(() => import('@core/modal/delete/all'));

const OrderDetails = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const params = {} as IPaginationQuery;

	searchParams.forEach((value, key) => ((params as any)[key] = value));

	const { data, pagination, isLoading, url, deleteData, refetch } = useOrderDetails2<IOrderDetails[]>(params);

	const pageInfo = useMemo(() => new PageInfo('Order Details', url, 'order__details'), [url]);

	const handleCreate = () => navigate('/template/entry-with-details/add'); // TODO: Update route

	const handleUpdate = (row: Row<IOrderDetails>) => {
		navigate(`/template/entry-with-details/${row.original.id}/update`); // TODO: Update route
	};

	// Delete Modal state
	// Single Delete Item
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Single Delete Handler
	const handleDelete = (row: Row<IOrderDetails>) => {
		setDeleteItem({
			id: row?.original?.order_info_uuid,
			name: row?.original?.order_number,
		});
	};

	// Delete All Item
	const [deleteItems, setDeleteItems] = useState<{ id: string; name: string; checked: boolean }[] | null>(null);

	// Delete All Row Handlers
	const handleDeleteAll = (rows: Row<IOrderDetails>[]) => {
		const selectedRows = rows.map((row) => row.original);

		setDeleteItems(
			selectedRows.map((row) => ({
				id: row.order_info_uuid,
				name: row.order_number,
				checked: true,
			}))
		);
	};

	// Table Columns
	const columns = orderDetailsColumns();

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProviderSSR
				start_date={params.start_date ? new Date(params.start_date) : undefined}
				end_date={params.end_date ? new Date(params.end_date) : undefined}
				title={pageInfo.getTitle()}
				pagination={pagination!}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				handleCreate={handleCreate}
				handleUpdate={handleUpdate}
				handleDelete={handleDelete}
				handleRefetch={refetch}
				handleDeleteAll={handleDeleteAll}
				filterOptions={orderDetailsFilters}
			>
				{renderSuspenseModals([
					<DeleteModal
						{...{
							deleteItem,
							setDeleteItem,
							url,
							deleteData,
						}}
					/>,
					<DeleteAllModal
						{...{
							deleteItems,
							setDeleteItems,
							url,
							deleteData,
						}}
					/>,
				])}
			</TableProviderSSR>
		</PageProvider>
	);
};

export default OrderDetails;
