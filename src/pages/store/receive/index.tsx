import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { PageInfo } from '@/utils';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { receiveColumns } from '../_config/columns';
import { IReceiveTableData } from '../_config/columns/columns.type';
import { usePurchaseDescription } from '../_config/query';

const DeleteModal = lazy(() => import('@/components/core/modal/delete'));
const DeleteAllModal = lazy(() => import('@/components/core/modal/delete/all'));

const Receive = () => {
	const navigate = useNavigate();
	const { data, isLoading, url, deleteData, refetch } = usePurchaseDescription<IReceiveTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Receive', url, 'store__receive'), [url]);

	// Add/Update Modal state
	const handleCreate = () => navigate('/store/receive/add');

	const handleUpdate = (row: Row<IReceiveTableData>) => {
		navigate(`/store/receive/${row.original.uuid}/update`);
	};

	// Delete Modal state
	// Single Delete Item
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Single Delete Handler
	const handleDelete = (row: Row<IReceiveTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.challan_number,
		});
	};

	// Delete All Item
	const [deleteItems, setDeleteItems] = useState<{ id: string; name: string; checked: boolean }[] | null>(null);

	// Delete All Row Handlers
	const handleDeleteAll = (rows: Row<IReceiveTableData>[]) => {
		const selectedRows = rows.map((row) => row.original);

		setDeleteItems(
			selectedRows.map((row) => ({
				id: row.uuid,
				name: row.challan_number,
				checked: true,
			}))
		);
	};

	// Table Columns
	const columns = receiveColumns();

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				handleCreate={handleCreate}
				handleUpdate={handleUpdate}
				handleDelete={handleDelete}
				handleRefetch={refetch}
				handleDeleteAll={handleDeleteAll}>
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
			</TableProvider>
		</PageProvider>
	);
};

export default Receive;
