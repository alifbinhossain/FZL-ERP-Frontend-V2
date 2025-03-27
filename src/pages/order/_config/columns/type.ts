import { IResponse } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// Merchandiser Table Data Type
export type IMerchandiserData = {
	uuid: string;
	party_uuid: string;
	party_name: string;
	name: string;
	email: string;
	phone: string;
	address: string;
	created_at: string;
	updated_at: string;
	created_by: string;
	created_by_name: string;
	remarks: string;
};

export interface IMerchandiserDataAddOrUpdateProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IMerchandiserData | null;
	setUpdatedData?: React.Dispatch<React.SetStateAction<IMerchandiserData | null>>;
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

export type IOrderDetails = {
	order_info_uuid: string;
	reference_order_info_uuid: string;
	order_number: string;
	id: number;
	order_number_wise_rank: string;
	item_description: string;
	item_name: string;
	nylon_stopper_name: string;
	zipper_number_name: string;
	end_type_name: string;
	puller_type_name: string;
	order_description_uuid: string;
	buyer_uuid: string;
	buyer_name: string;
	party_uuid: string;
	party_name: string;
	marketing_uuid: string;
	marketing_name: string;
	merchandiser_uuid: string | null;
	merchandiser_name: string | null;
	factory_uuid: string;
	factory_name: string;
	is_sample: number;
	is_bill: number;
	is_cash: number;
	marketing_priority: string;
	factory_priority: string;
	status: number;
	created_by_uuid: string;
	created_by_name: string;
	created_at: string;
	updated_at: string | null;
	remarks: string;
	print_in: string;
	is_cancelled: boolean;
	is_inch: number;
	is_meter: number;
	is_cm: number;
	order_type: string;
	is_multi_color: number;
	order_description_created_at: string;
	order_description_updated_at: string | null;
	tape_received: number;
	multi_color_tape_received: number;
	tape_transferred: number;
	order_description_remarks: string;
	revision_no: number;
	order_number_wise_count: string;
	swatch_approval_count: string;
	order_entry_count: string;
	price_approval_count: string;
	is_swatch_approved: number;
};
