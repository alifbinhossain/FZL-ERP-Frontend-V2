import { useEffect } from 'react';
import { IResponse } from '@/types';
import { getDateTime } from '@/utils';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useAuth, useRHF } from '@/hooks';

import CoreForm from '@/components/core/form';
import { AddModal } from '@/components/core/modal';
import { FormField } from '@/components/ui/form';

import nanoid from '@/lib/nanoid';

import { IVendorTableData } from '../_const/columns/columns.type';
import { usePurchaseVendorByUUID } from '../_const/query';
import { IVendor, VENDOR_NULL, VENDOR_SCHEMA } from '../_const/schema';

interface IAddOrUpdateProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IVendorTableData | null;
	setUpdatedData?: React.Dispatch<
		React.SetStateAction<IVendorTableData | null>
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
	const { data } = usePurchaseVendorByUUID(updatedData?.uuid as string);

	const form = useRHF(VENDOR_SCHEMA, VENDOR_NULL);

	const onClose = () => {
		setUpdatedData!(null);
		form.reset(VENDOR_NULL);
		setOpen((prev) => !prev);
	};

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	function onSubmit(values: IVendor) {
		if (isUpdate) {
			// UPDATE ITEM
			updateData.mutate({
				url: `${url}/${updatedData?.uuid}`,
				updatedData: {
					...values,
					updated_at: getDateTime(),
				},
				onClose,
			});
		} else {
			// ADD NEW ITEM
			postData.mutate({
				url,
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
			title={isUpdate ? 'Update Vendor' : 'Add Vendor'}
			form={form}
			onSubmit={onSubmit}>
			<FormField
				control={form.control}
				name='name'
				render={(props) => <CoreForm.Input {...props} />}
			/>
			<FormField
				control={form.control}
				name='contact_name'
				render={(props) => <CoreForm.Input label='Person' {...props} />}
			/>
			<FormField
				control={form.control}
				name='contact_number'
				render={(props) => (
					<CoreForm.Input label='Phone Number' {...props} />
				)}
			/>
			<FormField
				control={form.control}
				name='email'
				render={(props) => <CoreForm.Input {...props} />}
			/>
			<FormField
				control={form.control}
				name='office_address'
				render={(props) => <CoreForm.Input {...props} />}
			/>
			<FormField
				control={form.control}
				name='remarks'
				render={(props) => <CoreForm.Textarea {...props} />}
			/>
		</AddModal>
	);
};

export default AddOrUpdate;
