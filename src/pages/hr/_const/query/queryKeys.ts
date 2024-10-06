export const hrQK = {
	all: () => ['admin'],

	// department
	department: () => [...hrQK.all(), 'department'],
	departmentByUUID: (uuid: string) => [...hrQK.department(), uuid],

	// designation
	designation: () => [...hrQK.all(), 'designation'],
	designationByUUID: (uuid: string) => [...hrQK.designation(), uuid],

	// user
	user: () => [...hrQK.all(), 'user'],
	userByUUID: (uuid: string) => [...hrQK.user(), uuid],
	userCanAccess: (uuid: string) => [...hrQK.user(), 'can-access', uuid],
};
