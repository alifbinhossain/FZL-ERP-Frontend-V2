import { useEffect } from 'react';
import { IResponse } from '@/types';
import CoreForm from '@core/form';
import { IFormSelectOption } from '@core/form/types';
import { AddModal } from '@core/modal';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';

import { useOtherMaterialSection, useOtherMaterialType } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IStockTableData } from '../_config/columns/columns.type';
import { useMaterialInfoByUUID } from '../_config/query';
import { IMaterial, MATERIAL_NULL, MATERIAL_SCHEMA } from '../_config/schema';

interface IAddOrUpdateProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IStockTableData | null;
	setUpdatedData?: React.Dispatch<React.SetStateAction<IStockTableData | null>>;
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
	const { data } = useMaterialInfoByUUID(updatedData?.uuid as string);
	const { data: section } = useOtherMaterialSection<IFormSelectOption[]>();
	const { data: materialType } = useOtherMaterialType<IFormSelectOption[]>();

	const form = useRHF(MATERIAL_SCHEMA, MATERIAL_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(MATERIAL_NULL);
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
	async function onSubmit(values: IMaterial) {
		if (isUpdate) {
			// UPDATE ITEM
			await updateData.mutateAsync({
				url: `${url}/${updatedData?.uuid}`,
				updatedData: {
					...values,
					updated_at: getDateTime(),
				},
				onClose,
			});
		} else {
			// ADD NEW ITEM
			await postData.mutateAsync({
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

	const unitOptions: IFormSelectOption[] = [
		{ label: 'kg', value: 'kg' },
		{ label: 'Litre', value: 'ltr' },
		{ label: 'Meter', value: 'mtr' },
		{ label: 'Piece', value: 'pcs' },
	];

	return (
		<AddModal
			open={open}
			setOpen={onClose}
			title={isUpdate ? 'Update Stock' : 'Add Stock'}
			form={form}
			onSubmit={onSubmit}
			className='max-w-4xl'>
			<CoreForm.Section className='lg:grid-cols-2'>
				<FormField
					control={form.control}
					name='section_uuid'
					render={(props) => (
						<CoreForm.ReactSelect
							label='Section'
							placeholder='Select Section'
							isDisabled={!!updatedData?.uuid}
							options={section!}
							{...props}
						/>
					)}
				/>
				<FormField
					control={form.control}
					name='type_uuid'
					render={(props) => (
						<CoreForm.ReactSelect
							label='Type'
							placeholder='Select Material Type'
							isDisabled={!!updatedData?.uuid}
							options={materialType!}
							{...props}
						/>
					)}
				/>
			</CoreForm.Section>

			<CoreForm.Section>
				<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
				<FormField control={form.control} name='short_name' render={(props) => <CoreForm.Input {...props} />} />
				<FormField
					control={form.control}
					name='threshold'
					render={(props) => (
						<CoreForm.JoinInputSelect
							type='number'
							selectField={{
								name: 'unit',
								options: unitOptions,
							}}
							{...props}
						/>
					)}
				/>
			</CoreForm.Section>

			<CoreForm.Section className='lg:grid-cols-2'>
				<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
				<FormField
					control={form.control}
					name='description'
					render={(props) => <CoreForm.Textarea {...props} />}
				/>
			</CoreForm.Section>
		</AddModal>
	);
};

export default AddOrUpdate;
