import * as React from 'react';
import { IToolbarOptions } from '@/types';
import { Column, ColumnDef } from '@tanstack/react-table';
import { DateRange } from 'react-day-picker';

type TStartEndDate = {
	start_date: Date | string | undefined;
	end_date: Date | string | undefined;
};

export type TTableExportCSV = TStartEndDate;

export type TTableDateRange = TStartEndDate & {
	onUpdate: (({ range }: { range: DateRange }) => void) | undefined;
};

export interface IDataTableEntryProps<TData, TValue> {
	title: string;
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	toolbarOptions?: 'none' | IToolbarOptions[];
}

type TDefaultColumn<TData, TValue> = {
	column: Column<TData, TValue>;
};

export type TableColumnHeaderProps<TData, TValue> = React.HTMLAttributes<HTMLDivElement> &
	TDefaultColumn<TData, TValue>;

export type IFilterProps<TData, TValue> = TDefaultColumn<TData, TValue> & {
	showLabel?: boolean;
};

export type TableFacetedFilterProps<TData, TValue> = {
	column?: Column<TData, TValue>;
	title?: string;
	options: {
		label: string;
		value: string;
		icon?: React.ComponentType<{ className?: string }>;
	}[];
};
