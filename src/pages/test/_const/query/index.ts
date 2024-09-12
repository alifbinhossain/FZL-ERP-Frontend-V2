import { useTQuery } from '@/hooks';
import { testQK } from './queryKeys';

export const useTest = <T>() =>
	useTQuery<T>({
		queryKey: testQK.all(),
		url: '/test',
	});
