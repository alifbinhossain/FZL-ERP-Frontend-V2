import { RouteObject } from 'react-router-dom';

export type IAuthResponse = {
	status: number;
	type: string;
	message: string;
	token: string;
	user: IUser;
	can_access: string;
};

export type IToast = {
	status: number;
	type:
		| 'create'
		| 'insert'
		| 'delete'
		| 'error'
		| 'warning'
		| 'update'
		| string;
	message: string;
};

export type IResponse<T> = {
	toast: IToast;
	data: T;
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
};
