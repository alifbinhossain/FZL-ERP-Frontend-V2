import { useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { PageInfo } from '@/utils';

import { DeleteModal } from '@/components/core/modal';

import { IVendorTableData, vendorColumns } from '../_const/columns';
import { usePurchaseVendor } from '../_const/query';
import AddOrUpdate from './add-or-update';

const Vendor = () => {
	const { data, isLoading, url, deleteData, postData, updateData, refetch } =
		usePurchaseVendor<IVendorTableData[]>();

	const pageInfo = useMemo(
		() => new PageInfo('Vendors', url, 'store__vendor'),
		[url]
	);

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<IVendorTableData | null>(
		null
	);
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
	const columns = vendorColumns();

	return (
		<PageProvider
			pageName={pageInfo.getTab()}
			pageTitle={pageInfo.getTabName()}>
			<TableProvider
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

export default Vendor;
