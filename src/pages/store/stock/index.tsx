import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import useAccess from '@/hooks/useAccess';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { stockColumns } from '../_config/columns';
import { IStockActionTrx, IStockActionTrxAgainstOrder, IStockTableData } from '../_config/columns/columns.type';
import { useMaterialInfo } from '../_config/query';

const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));
const DeleteAllModal = lazy(() => import('@core/modal/delete/all'));
const AgainstTrx = lazy(() => import('./material-trx'));
const AgainstOrderTransfer = lazy(() => import('./against-order-transfer'));

const Stock = () => {
	const { data, isLoading, url, deleteData, postData, updateData, refetch } = useMaterialInfo<IStockTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Store / Stock', url, 'store__stock'), [url]);

	const pageAccess = useAccess(pageInfo.getTab() as string) as string[];
	const actionTrxAccess = pageAccess.includes('click_action');
	const actionTrxAgainstOrderAccess = pageAccess.includes('click_trx_against_order');

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<IStockTableData | null>(null);
	const handleUpdate = (row: Row<IStockTableData>) => {
		setUpdatedData(row.original);
		setIsOpenAddModal(true);
	};

	// Delete Modal state
	// Single Delete Item
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Single Delete Handler
	const handleDelete = (row: Row<IStockTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.name,
		});
	};

	// Delete All Item
	const [deleteItems, setDeleteItems] = useState<{ id: string; name: string; checked: boolean }[] | null>(null);

	// Delete All Row Handlers
	const handleDeleteAll = (rows: Row<IStockTableData>[]) => {
		const selectedRows = rows.map((row) => row.original);

		setDeleteItems(
			selectedRows.map((row) => ({
				id: row.uuid,
				name: row.name,
				checked: true,
			})) // TODO: Update Delete Item ID & Name
		);
	};

	// Action Trx Modal state
	const [isOpenActionTrxModal, setIsOpenActionTrxModal] = useState(false);
	const [updateActionTrxData, setUpdateActionTrxData] = useState<IStockActionTrx | null>(null);

	const handleAgainstTrx = (row: Row<IStockTableData>) => {
		// TODO: Update Action Trx Data type
		setUpdateActionTrxData({
			uuid: row.original.uuid,
			name: row.original.name,
			stock: row.original.stock,
		});
		setIsOpenActionTrxModal(true);
	};

	// Action Against Order Modal state
	const [isOpenActionAgainstOrderModal, setIsOpenActionAgainstOrderModal] = useState(false);
	const [updateActionAgainstOrderData, setUpdateActionAgainstOrderData] =
		useState<IStockActionTrxAgainstOrder | null>(null);

	const handleAgainstOrder = (row: Row<IStockTableData>) => {
		setUpdateActionAgainstOrderData({
			uuid: row.original.uuid,
			name: row.original.name,
			stock: row.original.stock,
		});
		setIsOpenActionAgainstOrderModal(true);
	};

	// Table Columns
	const columns = stockColumns({
		actionTrxAccess,
		actionTrxAgainstOrderAccess,
		handleAgainstTrx,
		handleAgainstOrder,
	});

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
					<AddOrUpdate
						{...{
							url,
							open: isOpenAddModal,
							setOpen: setIsOpenAddModal,
							updatedData,
							setUpdatedData,
							postData,
							updateData,
						}}
					/>,

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

					<AgainstTrx
						{...{
							open: isOpenActionTrxModal,
							setOpen: setIsOpenActionTrxModal,
							updatedData: updateActionTrxData,
							setUpdatedData: setUpdateActionTrxData,
							postData,
							url: '/material/trx',
						}}
					/>,
					<AgainstOrderTransfer
						{...{
							open: isOpenActionAgainstOrderModal,
							setOpen: setIsOpenActionAgainstOrderModal,
							updatedData: updateActionAgainstOrderData,
							setUpdatedData: setUpdateActionAgainstOrderData,
							postData,
							url: '/zipper/material-trx-against-order',
						}}
					/>,
				])}
			</TableProvider>
		</PageProvider>
	);
};

export default Stock;
