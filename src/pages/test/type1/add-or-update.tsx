import { useEffect } from 'react';
import { IResponse } from '@/types';
import { getDateTime } from '@/utils';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useAuth, useRHF } from '@/hooks';

import { FormInput } from '@/components/core/form';
import { AddModal } from '@/components/core/modal';
import { FormField } from '@/components/ui/form';

import nanoid from '@/lib/nanoid';

import { IPaymentTableData } from './_const/columns'; // TODO: Update type here
import { ITest, TEST_NULL, TEST_SCHEMA } from './_const/schema'; // TODO: Import Schema

interface IAddOrUpdateProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IPaymentTableData | null; // TODO: Update type here
	setUpdatedData?: React.Dispatch<
		React.SetStateAction<IPaymentTableData | null> // TODO: Update type here
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
	updateData: UseMutationResult<
		IResponse<any>,
		AxiosError<IResponse<any>, any>,
		{
			url: string;
			updatedData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
}

const AddOrUpdate: React.FC<IAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	postData,
	updateData,
}) => {
	const isUpdate = !!updatedData;

	const { user } = useAuth();
	const { data } = {
		data: {
			amount: 200,
			email: 'update@gmail.com',
			id: '1',
			status: 'success',
		},
	}; // TODO: Replace the object with query by id (e.g. useTestById(updatedData?.id as string))

	const form = useRHF(TEST_SCHEMA, TEST_NULL); // TODO: Update schema here

	const onClose = () => {
		setOpen((prev) => !prev);
		setUpdatedData?.(null);
		form.reset(TEST_NULL); // TODO: Update schema here
	};

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	function onSubmit(values: ITest) {
		// TODO: Update type here
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);

		if (isUpdate) {
			// UPDATE ITEM
			updateData.mutate({
				url: `${url}/${updatedData?.id}`, // TODO: Update url here if needed
				updatedData: {
					...values,
					updated_at: getDateTime(),
				},
				onClose,
			});
		} else {
			// ADD NEW ITEM
			postData.mutate({
				url, // TODO: Update url here if needed
				newData: {
					...values,
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
			title={isUpdate ? 'Update Test' : 'Add Test'} // TODO: Update title
			form={form}
			onSubmit={onSubmit}>
			<FormField
				control={form.control}
				name='email'
				render={(props) => <FormInput {...props} />}
			/>
		</AddModal>
	);
};

export default AddOrUpdate;
