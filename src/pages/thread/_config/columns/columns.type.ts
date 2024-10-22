// TODO: Replace with real data type of Table
export type IOrderTableData = {
	uuid: string;
	id: number;
	order_number: string;
	pi_numbers: string[];
	party_uuid: string;
	party_name: string;
	marketing_uuid: string;
	marketing_name: string;
	factory_uuid: string;
	factory_name: string;
	factory_address: string;
	merchandiser_uuid: string;
	merchandiser_name: string;
	buyer_uuid: string;
	buyer_name: string;
	is_sample: number;
	is_bill: number;
	is_cash: number;
	delivery_date: string;
	created_by: string;
	created_by_name: string;
	created_at: string;
	updated_at: string;
	remarks: string;
	swatch_approval_count: string;
	order_entry_count: string;
	is_swatches_approved: number;
};

// TODO: Replace with real data type of Table
export type IActionTrx = {
	uuid: string;
	name: string;
	stock: number;
};

// TODO: Replace with real data type of Table
export type IActionTrxAgainstOrder = {
	uuid: string;
	name: string;
	stock: number;
};

// TODO: Replace with real data type of Table
export type ITestDetails = {
	uuid: string;
	name: string;
	stock: string;
	created_at: string;
	updated_at: string;
	remarks: string;
	entries: ITestDetailsEntry[];
};

// TODO: Replace with real data type of Table
export type ITestDetailsEntry = {
	uuid: string;
	name: string;
	stock: string;
	created_at: string;
	updated_at: string;
	remarks: string;
};
