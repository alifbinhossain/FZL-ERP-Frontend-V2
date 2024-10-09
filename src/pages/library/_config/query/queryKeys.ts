export const libraryQK = {
	all: () => ['library'],
	// users
	users: () => [...libraryQK.all(), 'users'],
	userByUUID: (uuid: string) => [...libraryQK.users(), uuid],
	// policies
	policies: () => [...libraryQK.all(), 'policies'],
	policyByUUID: (uuid: string) => [...libraryQK.policies(), uuid],
};
