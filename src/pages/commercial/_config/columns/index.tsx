import { ColumnDef } from '@tanstack/react-table';

import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card';

import { IBankTableData } from './columns.type';

export const bankColumns = (): ColumnDef<IBankTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'swift_code',
		header: 'Swift Code',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'routing_no',
		header: 'Routing No',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'address',
		header: 'Address',
		cell: (info) => info.getValue(),
	},

	{
		accessorKey: 'policy',
		header: 'Policy',
		cell: (info) => (
			<HoverCard>
				<HoverCardTrigger className='line-clamp-2'>
					{info.getValue<string>()}
				</HoverCardTrigger>
				<HoverCardContent className='w-96'>
					{info.getValue<string>()}
				</HoverCardContent>
			</HoverCard>
		),
		size: 400,
	},
];
