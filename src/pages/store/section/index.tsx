import { Table } from '@/components/core/table';
import { ISectionTableData, sectionColumns } from '../_const/columns';
import { useMaterialSection } from '../_const/query';
import { PageProvider } from '@/context';
import { useMemo, useState } from 'react';
import { DeleteModal } from '@/components/core/modal';
import AddOrUpdate from './add-or-update';
import { PageInfo } from '@/utils';

const Section = () => {
	const { data, isLoading, url, deleteData, postData, updateData, refetch } =
		useMaterialSection<ISectionTableData[]>();

	const pageInfo = useMemo(
		() => new PageInfo('Section', url, 'store__section'),
		[url]
	);

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<ISectionTableData | null>(
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
	const columns = sectionColumns();

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

export default Section;
