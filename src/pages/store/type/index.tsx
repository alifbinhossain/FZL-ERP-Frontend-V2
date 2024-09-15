import { useMemo, useState } from 'react';
import { PageProvider } from '@/context';
import { PageInfo } from '@/utils';

import { DeleteModal } from '@/components/core/modal';
import { Table } from '@/components/core/table';

import { ITypeTableData, typeColumns } from '../_const/columns';
import { useMaterialType } from '../_const/query';
import AddOrUpdate from './add-or-update';

const Type = () => {
	const { data, isLoading, url, deleteData, postData, updateData, refetch } =
		useMaterialType<ITypeTableData[]>();

	const pageInfo = useMemo(
		() => new PageInfo('Type', url, 'store__type'),
		[url]
	);

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<ITypeTableData | null>(null);
	const handleUpdate = (id: number) => {
		const selectedRow = data![id];
		setUpdatedData(selectedRow);
		setIsOpenAddModal(true);
	};

	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (id: number) => {
		const selectedRow = data![id];
		setDeleteItem({
			id: selectedRow?.uuid,
			name: selectedRow?.name,
		});
	};

	// Table Columns
	const columns = typeColumns();

	return (
		<PageProvider
			pageName={pageInfo.getTab()}
			pageTitle={pageInfo.getTabName()}>
			<Table
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				handleCreate={handleCreate}
				handleUpdate={handleUpdate}
				handleDelete={handleDelete}
				handleRefetch={refetch}
			/>

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
			/>

			<DeleteModal
				{...{
					deleteItem,
					setDeleteItem,
					url,
					deleteData,
				}}
			/>
		</PageProvider>
	);
};

export default Type;
