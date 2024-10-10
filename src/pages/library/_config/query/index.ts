import useTQuery from '@/hooks/useTQuery';

import { libraryQK } from './queryKeys';

// * User * //
export const useLibraryUser = <T>() =>
	useTQuery<T>({
		queryKey: libraryQK.users(),
		url: '/hr/user-common',
	});
export const useLibraryUserByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: libraryQK.userByUUID(uuid),
		url: `/hr/user-common${uuid}`,
		enabled: !!uuid,
	});
// * Policy * //
export const useLibraryPolicy = <T>() =>
	useTQuery<T>({
		queryKey: libraryQK.policies(),
		url: '/hr/policy-and-notice',
	});
export const useLibraryPolicyByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: libraryQK.policyByUUID(uuid),
		url: `/hr/policy-and-notice${uuid}`,
		enabled: !!uuid,
	});
