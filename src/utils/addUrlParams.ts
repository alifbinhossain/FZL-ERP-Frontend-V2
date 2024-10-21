import { IParams } from '@/types';

function addUrlParams(url: string, params: IParams) {
	if (!params) return url;
	return `${url}?${Object.entries(params)
		.map(([key, value]) => `${key}=${value}`)
		.join('&')}`;
}

export default addUrlParams;
