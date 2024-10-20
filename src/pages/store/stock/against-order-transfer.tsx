import { IResponse } from '@/types';
import { getDateTime, getTransactionArea } from '@/utils';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import CoreForm from '@/components/core/form';
import { IFormSelectOption } from '@/components/core/form/form-select';
import { AddModal } from '@/components/core/modal';
import { FormField } from '@/components/ui/form';

import { useOtherOrderDescription } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';

import { IStockActionTrxAgainstOrder } from '../_config/columns/columns.type';
import {
	IMaterialTrxAgainstOrder,
	MATERIAL_TRX_AGAINST_ORDER_NULL,
	MATERIAL_TRX_AGAINST_ORDER_SCHEMA,
} from '../_config/schema';

interface IAgainstOrderTransferProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IStockActionTrxAgainstOrder | null;
	setUpdatedData?: React.Dispatch<
		React.SetStateAction<IStockActionTrxAgainstOrder | null>
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

const AgainstOrderTransfer: React.FC<IAgainstOrderTransferProps> = ({
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
		MATERIAL_TRX_AGAINST_ORDER_SCHEMA({
			minStock: 1,
			maxStock: updatedData?.stock || 0,
		}),
		MATERIAL_TRX_AGAINST_ORDER_NULL
	);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(MATERIAL_TRX_AGAINST_ORDER_NULL);
		setOpen((prev) => !prev);
	};

	const { data: order } = useOtherOrderDescription<IFormSelectOption[]>();

	// Submit handler
	async function onSubmit(values: IMaterialTrxAgainstOrder) {
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
			title={'Material Trx Against Order : ' + updatedData?.name}
			form={form}
			onSubmit={onSubmit}>
			<FormField
				control={form.control}
				name='order_description_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Order'
						placeholder='Select an Order'
						options={order!}
						{...props}
					/>
				)}
			/>

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

export default AgainstOrderTransfer;
