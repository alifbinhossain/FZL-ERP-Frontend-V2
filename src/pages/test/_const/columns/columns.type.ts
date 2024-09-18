// TODO: Replace with real data type of Table
export type IPaymentTableData = {
	id: string;
	amount: number;
	status: 'pending' | 'processing' | 'success' | 'failed';
	email: string;
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
