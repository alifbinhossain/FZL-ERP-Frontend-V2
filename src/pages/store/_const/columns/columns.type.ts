// Vendor
export type IVendorTableData = {
	uuid: string;
	name: string;
	contact_name: string;
	contact_number: string;
	email: string;
	office_address: string;
};

// Type
export type ITypeTableData = {
	uuid: string;
	name: string;
	short_name: string;
};

// Section
export type ISectionTableData = {
	uuid: string;
	name: string;
	short_name: string;
};

// Stock
export type IStockTableData = {
	uuid: string;
	name: string;
	threshold: number;
	stock: number;
	unit: string;
	section_name: string;
	type_name: string;
	description: string;
};

// Stock Action Trx
export type IStockActionTrx = {
	uuid: string;
	stock: number;
	name: string;
};

// Stock Action Trx Against Order
export type IStockActionTrxAgainstOrder = {
	uuid: string;
	stock: number;
	name: string;
};

// Receive
export type IReceiveTableData = {
	uuid: string;
	purchase_id: string;
	vendor_uuid: string;
	vendor_name: string;
	is_local: number;
	lc_number: string;
	challan_number: string;
};
