import { ColumnDef, Row } from '@tanstack/react-table';

import PageAssign from '@/components/buttons/page-assign';
import ResetPassword from '@/components/buttons/reset-password';
import { LinkOnly } from '@/components/link';
import { Switch } from '@/components/ui/switch';

import {
	IDepartmentTableData,
	IDesignationTableData,
	ITestDetailsEntry,
	IUserTableData,
} from './columns.type';

export const departmentColumns = (): ColumnDef<IDepartmentTableData>[] => [
	{
		accessorKey: 'department',
		header: 'Department',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];
export const designationColumns = (): ColumnDef<IDesignationTableData>[] => [
	{
		accessorKey: 'designation',
		header: 'Designation',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

export function userColumns({
	pageAssignAccess,
	resetPasswordAccess,
	statusAccess,
	handleStatus,
	handleResetPassword,
	handlePageAssign,
}: {
	statusAccess: boolean;
	resetPasswordAccess: boolean;
	pageAssignAccess: boolean;
	handleStatus: (row: Row<any>) => void;
	handleResetPassword: (row: Row<any>) => void;
	handlePageAssign: (row: Row<any>) => void;
}): ColumnDef<IUserTableData>[] {
	return [
		{
			accessorKey: 'status',
			header: 'Status',
			enableColumnFilter: false,
			cell: (info) => {
				return (
					<Switch
						checked={Number(info.getValue()) === 1}
						onCheckedChange={() => handleStatus(info.row)}
					/>
				);
			},
			size: 40,
			meta: {
				hidden: !statusAccess,
			},
		},
		{
			accessorKey: 'name',
			header: 'Name',
			enableColumnFilter: false,
			cell: (info) => (
				<span className='capitalize'>{info.getValue<string>()}</span>
			),
		},
		{
			accessorKey: 'email',
			header: 'Email',
			enableColumnFilter: false,
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: 'department',
			header: 'Department',
			enableColumnFilter: false,
			cell: (info) => {
				const { department, designation } = info.row.original;

				return (
					<div className='flex flex-col'>
						<span className='capitalize'>{department}</span>
						<span className='text-xs capitalize text-gray-400'>
							{designation}
						</span>
					</div>
				);
			},
		},

		{
			accessorKey: 'reset_pass_actions',
			id: 'reset_pass_actions',
			header: () => (
				<span>
					Reset <br />
					Password
				</span>
			),
			enableColumnFilter: false,
			enableSorting: false,
			cell: (info) => (
				<ResetPassword onClick={() => handleResetPassword(info.row)} />
			),
			size: 40,
			meta: {
				hidden: !resetPasswordAccess,
			},
		},

		{
			accessorKey: 'page_assign_actions',
			id: 'page_assign_actions',
			header: () => (
				<span>
					Page <br />
					Assign
				</span>
			),
			enableColumnFilter: false,
			enableSorting: false,
			cell: (info) => (
				<PageAssign onClick={() => handlePageAssign(info.row)} />
			),
			size: 40,
			meta: {
				hidden: !pageAssignAccess,
			},
		},
	];
}

// TODO: Replace with real data columns of Table
export const test3Columns = (): ColumnDef<IDepartmentTableData>[] => [
	{
		accessorKey: 'id',
		header: 'ID',
		cell: (info) => (
			<LinkOnly
				uri={`/test/type3/${info.getValue()}`}
				title={`Details - ${info.getValue()}`}
			/>
		),
	},
	{
		accessorKey: 'status',
		header: 'Status',
	},
	{
		accessorKey: 'email',
		header: 'Email',
	},
	{
		accessorKey: 'amount',
		header: 'Amount',
		meta: {
			filterVariant: 'range', // TODO: Update filter variant for column level filtering
		},
	},
];

// TODO: Replace with real data type of Table
export const testEntryColumns = (): ColumnDef<ITestDetailsEntry>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'stock',
		header: 'Stock',
	},
];
