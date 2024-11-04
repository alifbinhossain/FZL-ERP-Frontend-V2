import { TableProvider } from '@/context';
import { IToolbarOptions } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

interface IDataTableEntryProps<TData, TValue> {
	title: string;
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	toolbarOptions?: 'none' | IToolbarOptions[];
}

const DataTableEntry = <TData, TValue>({
	title,
	columns,
	data,
	toolbarOptions,
}: IDataTableEntryProps<TData, TValue>) => {
	return (
		<TableProvider
			title={title}
			columns={columns}
			data={data}
			enableRowSelection={false}
			isEntry
			toolbarOptions={toolbarOptions}
		/>
	);
};

export default DataTableEntry;
