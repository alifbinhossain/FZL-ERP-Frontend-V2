import { Table } from '@tanstack/react-table';
import { createContext, useMemo } from 'react';

interface ITableContext<TDate> {
	title: string;
	subtitle?: string;
	table: Table<TDate>;
	handleCreate?: () => void;
	handleUpdate?: (id: number) => void;
	handleDelete?: (id: number) => void;
	handleRefetch?: () => void;
}

export const TableContext = createContext({} as ITableContext<any>);

interface ITableProviderProps<TData> {
	title: string;
	subtitle?: string;
	table: Table<TData>;
	children: React.ReactNode;
	handleCreate?: () => void;
	handleUpdate?: (id: number) => void;
	handleDelete?: (id: number) => void;
	handleRefetch?: () => void;
}

const TableProvider: React.FC<ITableProviderProps<any>> = ({
	title,
	subtitle,
	children,
	table,
	handleCreate,
	handleUpdate,
	handleDelete,
	handleRefetch,
}) => {
	const value = useMemo(
		(): ITableContext<any> => ({
			title,
			subtitle,
			table,
			handleCreate,
			handleUpdate,
			handleDelete,
			handleRefetch,
		}),
		[
			title,
			subtitle,
			table,
			handleCreate,
			handleUpdate,
			handleDelete,
			handleRefetch,
		]
	);
	return (
		<TableContext.Provider value={value}>{children}</TableContext.Provider>
	);
};

export default TableProvider;
