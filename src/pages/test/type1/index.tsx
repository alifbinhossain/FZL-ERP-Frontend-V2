import { useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { PageInfo } from '@/utils';

import { DeleteModal } from '@/components/core/modal';

import { IPaymentTableData, testColumns } from './_const/columns'; // TODO: Import columns
import { useTest } from './_const/query'; // TODO: Import query
import AddOrUpdate from './add-or-update';

//TODO: Remove it when working with real data
const fakePayments: IPaymentTableData[] = Array.from(
	{ length: 10 },
	(_, i) => ({
		amount: 100 + i,
		email: `a${i}@a.com`,
		id: `${i + 1}`,
		status: 'success',
	})
);

// TODO: Update Component Name
const TestType1 = () => {
	const { data, isLoading, url, deleteData, postData, updateData, refetch } =
		useTest<IPaymentTableData[]>(); // TODO: Update query

	// TODO: Update Page Info (Title, Url and Tab Name)
	const pageInfo = useMemo(
		() => new PageInfo('Test', url, 'order__info'),
		[url]
	);

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<IPaymentTableData | null>( // TODO: Update updatedData type
		null
	);
	const handleUpdate = (id: number) => {
		const selectedRow = fakePayments?.[id]; // TODO: Replace fakePayments?.[id] with data![id]
		setUpdatedData(selectedRow);
		setIsOpenAddModal(true);
	};

	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (id: number) => {
		const selectedRow = fakePayments?.[id]; // TODO: Replace fakePayments?.[id] with data![id]
		setDeleteItem({
			id: selectedRow?.id, // TODO: Update Delete Item ID
			name: selectedRow?.email, // TODO: Update Delete Item Name
		});
	};

	// Delete All Row Handlers

	// Table Columns
	const columns = testColumns(); // TODO: Update columns

	return (
		<PageProvider
			pageName={pageInfo.getTab()}
			pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? fakePayments} // TODO: Replace fakePayments with []
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

export default TestType1;
