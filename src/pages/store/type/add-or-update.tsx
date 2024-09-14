import { AxiosError } from 'axios';
import { useEffect } from 'react';

import { useAuth, useRHF } from '@/hooks';
import { IResponse } from '@/types';
import { SECTION_NULL, SECTION_SCHEMA, ISection } from '../_const/schema';

import { FormField } from '@/components/ui/form';
import { FormInput } from '@/components/core/form';
import { AddModal } from '@/components/core/modal';
import { UseMutationResult } from '@tanstack/react-query';
import { ITypeTableData } from '../_const/columns';
import { getDateTime } from '@/utils';
import nanoid from '@/lib/nanoid';
import { useMaterialTypeByUUID } from '../_const/query';

interface IAddOrUpdateProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: ITypeTableData | null;
	setUpdatedData?: React.Dispatch<
		React.SetStateAction<ITypeTableData | null>
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
	const { data } = useMaterialTypeByUUID(updatedData?.uuid as string);

	const form = useRHF(SECTION_SCHEMA, SECTION_NULL);

	const onClose = () => {
		setOpen((prev) => !prev);
		setUpdatedData?.(null);
		form.reset(SECTION_NULL);
	};

	// Reset form values when data is updated
	useEffect(() => {
		if (data) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	// Submit handler
	function onSubmit(values: ISection) {
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
			title={isUpdate ? 'Update Type' : 'Add Type'}
			form={form}
			onSubmit={onSubmit}>
			<FormField
				control={form.control}
				name='name'
				render={(props) => <FormInput {...props} />}
			/>
			<FormField
				control={form.control}
				name='short_name'
				render={(props) => <FormInput {...props} />}
			/>
			<FormField
				control={form.control}
				name='remarks'
				render={(props) => <FormInput {...props} />}
			/>
		</AddModal>
	);
};

export default AddOrUpdate;
