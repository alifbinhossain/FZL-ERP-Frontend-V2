import { IPaginationQuery } from '@/types';

function addQueryParams(url: string, params: IPaginationQuery): string {
	if (!url) return '';

	const queryString = Object.keys(params)
		.filter((key) => params[key] !== undefined && params[key] !== null && params[key] !== '')
		.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(String(params[key]))}`)
		.join('&');

	return queryString ? `${url}?${queryString}` : url;
}

export default addQueryParams;
