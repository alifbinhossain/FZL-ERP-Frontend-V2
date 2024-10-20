import { IResponse } from '@/types';
import { getDateTime, getTransactionArea } from '@/utils';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import CoreForm from '@/components/core/form';
import { AddModal } from '@/components/core/modal';
import { FormField } from '@/components/ui/form';

import nanoid from '@/lib/nanoid';

import { IStockActionTrx } from '../_config/columns/columns.type';
import {
	IMaterialStock,
	MATERIAL_STOCK_NULL,
	MATERIAL_STOCK_SCHEMA,
} from '../_config/schema';

interface IMaterialTrxProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IStockActionTrx | null;
	setUpdatedData?: React.Dispatch<
		React.SetStateAction<IStockActionTrx | null>
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

const MaterialTrx: React.FC<IMaterialTrxProps> = ({
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
		MATERIAL_STOCK_SCHEMA({
			minStock: 1,
			maxStock: updatedData?.stock || 0,
		}),
		MATERIAL_STOCK_NULL
	);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(MATERIAL_STOCK_NULL);
		setOpen((prev) => !prev);
	};

	// Submit handler
	async function onSubmit(values: IMaterialStock) {
		if (isUpdate) {
			await postData.mutateAsync({
				url,
				newData: {
					...values,
					material_uuid: updatedData.uuid,
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
			title={'Material Trx of ' + updatedData?.name}
			form={form}
			onSubmit={onSubmit}>
			<FormField
				control={form.control}
				name='trx_to'
				render={(props) => (
					<CoreForm.ReactSelect
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
					<CoreForm.Input
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
				render={(props) => <CoreForm.Textarea {...props} />}
			/>
		</AddModal>
	);
};

export default MaterialTrx;
