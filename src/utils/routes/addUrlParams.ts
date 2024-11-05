import { IParams } from '@/types';

function addUrlParams(url: string, params: IParams) {
	if (!params) return url;

	const allParams = Object.entries(params)
		.map(([key, value]) => `${key}=${value}`)
		.join('&');

	return `${url}?${allParams}`;
}

export default addUrlParams;
