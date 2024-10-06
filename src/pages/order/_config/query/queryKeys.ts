// Order Query Keys
export const orderQK = {
	all: () => ['order'],

	// detail
	detail: () => [...orderQK.all(), 'details'],
	detailByUUID: (uuid: string) => [...orderQK.detail(), uuid],
	detailByOrderNumber: (orderNumber: string) => [
		...orderQK.detail(),
		orderNumber,
	],
	detailByOrderDescription: (orderNumber: string, uuid: string) => [
		...orderQK.detail(),
		orderNumber,
		uuid,
	],

	// description
	description: () => [...orderQK.all(), 'description'],
	descriptionByUUID: (uuid: string) => [...orderQK.description(), uuid],

	// entry
	entry: () => [...orderQK.all(), 'entries'],
	entryByUUID: (uuid: string) => [...orderQK.entry(), uuid],

	// info
	info: () => [...orderQK.all(), 'info'],
	infoById: (id: string) => [...orderQK.info(), id],
	infoByUUID: (uuid: string) => [...orderQK.info(), uuid],

	// buyer
	buyer: () => [...orderQK.all(), 'buyer'],
	buyerByUUID: (uuid: string) => [...orderQK.buyer(), uuid],

	// marketing
	marketing: () => [...orderQK.all(), 'marketing'],
	marketingByUUID: (uuid: string) => [...orderQK.marketing(), uuid],

	// factory
	factory: () => [...orderQK.all(), 'factory'],
	factoryByUUID: (uuid: string) => [...orderQK.factory(), uuid],

	// merchandiser
	merchandiser: () => [...orderQK.all(), 'merchandisers'],
	merchandiserByUUID: (uuid: string) => [...orderQK.merchandiser(), uuid],

	//Party
	party: () => [...orderQK.all(), 'party'],
	partyByUUID: (uuid: string) => [...orderQK.party(), uuid],

	//property
	property: () => [...orderQK.all(), 'properties'],
	propertyByUUID: (uuid: string) => [...orderQK.property(), uuid],
};
