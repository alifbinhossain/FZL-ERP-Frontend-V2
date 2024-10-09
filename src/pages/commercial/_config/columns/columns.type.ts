// TODO: Replace with real data type of Table
export type IPaymentTableData = {
	id: string;
	amount: number;
	status: 'pending' | 'processing' | 'success' | 'failed';
	email: string;
};

// Bank Table
export type IBankTableData = {
	uuid: string;
	name: string;
	swift_code: string;
	address: string;
	policy: string;
	routing_no: string;
	created_at: string;
	updated_at: string;
	created_by: string;
	created_by_name: string;
	remarks: string;
};
