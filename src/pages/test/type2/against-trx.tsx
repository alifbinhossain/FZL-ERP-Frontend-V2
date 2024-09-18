import { IResponse } from '@/types';
import { getDateTime, getTransactionArea } from '@/utils';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useAuth, useRHF } from '@/hooks';

import { FormInput, FormSelect, FormTextarea } from '@/components/core/form';
import { AddModal } from '@/components/core/modal';
import { FormField } from '@/components/ui/form';

import nanoid from '@/lib/nanoid';

import { IActionMaterialTrx } from '../_const/columns'; // TODO: Update type here
import {
	ITestStock,
	TEST_STOCK_NULL,
	TEST_STOCK_SCHEMA,
} from '../_const/schema';

// TODO: Import Schema

interface IAddOrUpdateProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IActionMaterialTrx | null; // TODO: Update type here
	setUpdatedData?: React.Dispatch<
		React.SetStateAction<IActionMaterialTrx | null> // TODO: Update type here
	>;
	postData: UseMutationResult<
		IResponse<any>,
		AxiosError<IResponse<any>, any>,
		{
			url: string;
			newData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
}

const AgainstTrx: React.FC<IAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	postData,
}) => {
	const isUpdate = !!updatedData;

	const { user } = useAuth();

	const form = useRHF(
		TEST_STOCK_SCHEMA({ minStock: 1, maxStock: updatedData?.stock || 0 }),
		TEST_STOCK_NULL
	); // TODO: Update schema here

	const onClose = () => {
		setOpen((prev) => !prev);
		setUpdatedData?.(null);
		form.reset(TEST_STOCK_NULL); // TODO: Update schema here
	};

	// Submit handler
	async function onSubmit(values: ITestStock) {
		// TODO: Update type here
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);

		if (isUpdate) {
			await postData.mutate({
				url, // TODO: Update url here if needed
				newData: {
					...values,
					material_uuid: updatedData.uuid, // TODO: Update New Data
					created_at: getDateTime(),
					created_by: user?.uuid,
					uuid: nanoid(),
				},
				onClose,
			});
		}
	}

	return (
		<AddModal
			open={open}
			setOpen={onClose}
			title={'Trx Against ' + updatedData?.name} // TODO: Update title
			form={form}
			onSubmit={onSubmit}>
			{/* // TODO: Update form fields ⬇️ */}
			<FormField
				control={form.control}
				name='trx_to'
				render={(props) => (
					<FormSelect
						placeholder='Select Transaction Area'
						options={getTransactionArea}
						{...props}
					/>
				)}
			/>

			<FormField
				control={form.control}
				name='trx_quantity'
				render={(props) => (
					<FormInput
						label={`Trx Quantity`}
						type={'number'}
						subLabel={`Max: ${updatedData?.stock}`}
						placeholder={`Max: ${updatedData?.stock}`}
						{...props}
					/>
				)}
			/>

			<FormField
				control={form.control}
				name='remarks'
				render={(props) => <FormTextarea {...props} />}
			/>
		</AddModal>
	);
};

export default AgainstTrx;
