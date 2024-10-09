import { useTQuery } from '@/hooks';

import { reportQK } from './queryKeys';

export const useZipperProduction = <T>() =>
	useTQuery<T>({
		queryKey: reportQK.zipperProduction(),
		url: '/report/zipper-production-status-report',
	});

export const useDailyChallan = <T>() =>
	useTQuery<T>({
		queryKey: reportQK.dailyChallan(),
		url: '/report/daily-challan-report',
	});

export const usePIRegister = <T>() =>
	useTQuery<T>({
		queryKey: reportQK.piRegister(),
		url: '/report/pi-register-report',
	});

export const useLC = <T>(url: string) => {
	return useTQuery<T>({
		queryKey: reportQK.lc(url),
		url,
		enabled: !!url,
	});
};
