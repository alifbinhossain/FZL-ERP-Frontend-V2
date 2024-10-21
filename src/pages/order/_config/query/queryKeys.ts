import { IParams } from '@/types';

export const orderQK = {
	all: () => ['order'],

	// details
	details: () => [...orderQK.all(), 'details'],
	detailsByQuery: (query: string) => [
		...orderQK.all(),
		'detailsByQuery',
		query,
	],
	detailsByUUID: (uuid: string) => [...orderQK.details(), uuid],
	detailsByOrderNumber: (orderNumber: string) => [
		...orderQK.details(),
		orderNumber,
	],
	detailsByOrderDescription: (orderNumber: string, uuid: string) => [
		...orderQK.details(),
		orderNumber,
		uuid,
	],

	// Description
	description: () => [...orderQK.all(), 'description'],
	descriptionByUUID: (uuid: string) => [...orderQK.description(), uuid],

	// Entry
	entry: () => [...orderQK.all(), 'entries'],
	entryByUUID: (uuid: string) => [...orderQK.entry(), uuid],

	// info
	info: () => [...orderQK.all(), 'info'],
	infoByID: (id: string) => [...orderQK.info(), id],
	infoByUUID: (uuid: string) => [...orderQK.info(), uuid],

	// buyers
	buyer: () => [...orderQK.all(), 'buyer'], // [order, buyer]
	buyerByUUID: (uuid: string) => [...orderQK.buyer(), uuid], // [order, buyer, uuid]

	// marketing
	marketing: () => [...orderQK.all(), 'marketing'],
	marketingByUUID: (uuid: string) => [...orderQK.marketing(), uuid],

	// marketing
	factory: () => [...orderQK.all(), 'factory'],
	factoryByUUID: (uuid: string) => [...orderQK.factory(), uuid],

	// merchandisers
	merchandiser: () => [...orderQK.all(), 'merchandisers'],
	merchandiserQuery: ({ start_date, end_date }: IParams) => [
		...orderQK.merchandiser(),
		start_date,
		end_date,
	],
	merchandiserByUUID: (uuid: string) => [...orderQK.merchandiser(), uuid],

	//Party
	party: () => [...orderQK.all(), 'party'],
	partyByUUID: (uuid: string) => [...orderQK.party(), uuid],

	//properties
	properties: () => [...orderQK.all(), 'properties'],
	propertiesByUUID: (uuid: string) => [...orderQK.party(), uuid],
};
