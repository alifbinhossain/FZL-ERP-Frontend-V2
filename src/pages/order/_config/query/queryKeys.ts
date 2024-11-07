import { IParams } from '@/types';

const QK = {
	all: () => ['order'],

	// details
	details: () => [...QK.all(), 'details'],
	detailsByQuery: (query: string) => [...QK.all(), 'detailsByQuery', query],
	detailsByUUID: (uuid: string) => [...QK.details(), uuid],
	detailsByOrderNumber: (orderNumber: string) => [...QK.details(), orderNumber],
	detailsByOrderDescription: (orderNumber: string, uuid: string) => [...QK.details(), orderNumber, uuid],

	// Description
	description: () => [...QK.all(), 'description'],
	descriptionByUUID: (uuid: string) => [...QK.description(), uuid],

	// Entry
	entry: () => [...QK.all(), 'entries'],
	entryByUUID: (uuid: string) => [...QK.entry(), uuid],

	// info
	info: () => [...QK.all(), 'info'],
	infoByID: (id: string) => [...QK.info(), id],
	infoByUUID: (uuid: string) => [...QK.info(), uuid],

	// buyers
	buyer: () => [...QK.all(), 'buyer'], // [order, buyer]
	buyerByUUID: (uuid: string) => [...QK.buyer(), uuid], // [order, buyer, uuid]

	// marketing
	marketing: () => [...QK.all(), 'marketing'],
	marketingByUUID: (uuid: string) => [...QK.marketing(), uuid],

	// marketing
	factory: () => [...QK.all(), 'factory'],
	factoryByUUID: (uuid: string) => [...QK.factory(), uuid],

	// merchandisers
	merchandiserDefault: () => [...QK.all(), 'merchandisers'],
	merchandiser: ({ start_date, end_date }: IParams) => [...QK.merchandiserDefault(), start_date, end_date],
	merchandiserByUUID: (uuid: string) => [...QK.merchandiserDefault(), uuid],

	//Party
	party: () => [...QK.all(), 'party'],
	partyByUUID: (uuid: string) => [...QK.party(), uuid],

	//properties
	properties: () => [...QK.all(), 'properties'],
	propertiesByUUID: (uuid: string) => [...QK.party(), uuid],
};

export default QK;
