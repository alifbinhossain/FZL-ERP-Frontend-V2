import { useTQuery } from '@/hooks';

import { testQK } from './queryKeys';

// TODO: Remove this demo query and add all the queries like this
export const useTest = <T>() =>
	useTQuery<T>({
		queryKey: testQK.all(),
		url: '/test',
		enabled: false,
	});
