export const reportQK = {
	all: () => ['report'],

	// Zipper Production
	zipperProduction: () => [...reportQK.all(), 'zipper-production'],

	// Daily Challan
	dailyChallan: () => [...reportQK.all(), 'daily-challan'],

	// PI Register
	piRegister: () => [...reportQK.all(), 'pi-register'],

	// Lc
	lc: (url: string) => [...reportQK.all(), 'lc', url],
};
