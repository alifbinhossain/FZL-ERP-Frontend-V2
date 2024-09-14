import { ColumnDef } from '@tanstack/react-table';

// Vendor
export type IVendorTableData = {
	uuid: string;
	name: string;
	contact_name: string;
	contact_number: string;
	email: string;
	office_address: string;
};

export const vendorColumns = (): ColumnDef<IVendorTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'contact_name',
		header: 'Person',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'contact_number',
		header: 'Phone',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'email',
		header: 'Email',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'office_address',
		header: 'Address',
		cell: (info) => info.getValue(),
	},
];

// Type
export type ITypeTableData = {
	uuid: string;
	name: string;
	short_name: string;
};

export const typeColumns = (): ColumnDef<ITypeTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'short_name',
		header: 'Short Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

// Section
export type ISectionTableData = {
	uuid: string;
	name: string;
	short_name: string;
};

export const sectionColumns = (): ColumnDef<ISectionTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'short_name',
		header: 'Short Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];
