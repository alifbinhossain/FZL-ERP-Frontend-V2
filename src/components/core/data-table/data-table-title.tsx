import { TableProvider } from '@/context';
import { ColumnDef } from '@tanstack/react-table';

interface IDataTableTitleProps<TData, TValue> {
	title: string;
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

const DataTableTitle = <TData, TValue>({
	title,
	columns,
	data,
}: IDataTableTitleProps<TData, TValue>) => {
	return (
		<TableProvider
			title={title}
			columns={columns}
			data={data}
			enableRowSelection={false}
			isOnlyTitle
		/>
	);
};

export default DataTableTitle;
