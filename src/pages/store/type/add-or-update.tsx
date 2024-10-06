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

import { ITypeTableData } from '../_config/columns/columns.type';
import { useMaterialTypeByUUID } from '../_config/query';
import { ISection, SECTION_NULL, SECTION_SCHEMA } from '../_config/schema';

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
		setUpdatedData?.(null);
		form.reset(SECTION_NULL);
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
				render={(props) => <CoreForm.Input {...props} />}
			/>
			<FormField
				control={form.control}
				name='short_name'
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
