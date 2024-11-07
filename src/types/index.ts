import { RouteObject } from 'react-router-dom';

export type IAuthResponse = {
	status: number;
	type: string;
	message: string;
	token: string;
	user: IUser;
	can_access: { [key: string]: string };
};

export type IToast = {
	status: number;
	type: 'create' | 'insert' | 'delete' | 'error' | 'warning' | 'update' | string;
	message: string;
};

export type IResponse<T> = {
	toast: IToast;
	data: T;
};

export type IParams = {
	start_date: Date | string;
	end_date: Date | string;
};

export type IUser = {
	uuid: string;
	name: string;
	department: string;
};

export type IRoute = RouteObject & {
	name: string;
	children?: IRoute[];
	hidden?: boolean;
	page_name?: string;
	actions?: string[];
	disableCollapse?: boolean;
	page_type?: 'library' | 'entry' | 'update' | 'normal' | 'custom';
};

export type ITableFacetedFilter = {
	id: string;
	title: string;
	options: {
		label: string;
		value: string;
		icon?: React.ComponentType<{ className?: string }>;
	}[];
};

export type IToolbarOptions =
	| 'all'
	| 'all-filter'
	| 'view'
	| 'date-range'
	| 'faceted-filter'
	| 'export-csv'
	| 'export-pdf'
	| 'refresh'
	| 'new-entry';

export type IDeleteModal = {
	id: string;
	name: string;
} | null;
