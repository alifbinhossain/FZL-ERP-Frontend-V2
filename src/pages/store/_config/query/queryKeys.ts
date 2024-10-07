// Material Query Keys
export const materialQK = {
	all: () => ['material'],

	// stock
	stock: () => [...materialQK.all(), 'stock'],
	stockByUUID: (uuid: string) => [...materialQK.stock(), uuid],

	// section
	section: () => [...materialQK.all(), 'section'],
	sectionByUUID: (uuid: string) => [...materialQK.section(), uuid],

	// types
	type: () => [...materialQK.all(), 'type'],
	typeByUUID: (uuid: string) => [...materialQK.type(), uuid],

	// infos
	info: () => [...materialQK.all(), 'info'],
	infoByUUID: (uuid: string) => [...materialQK.info(), uuid],

	// trx
	trx: () => [...materialQK.all(), 'trx'],
	trxByUUID: (uuid: string) => [...materialQK.trx(), uuid],

	// stock to sfg
	stockToSGF: () => [...materialQK.all(), 'stock-to-sfg'],
	stockToSFGByUUID: (uuid: string) => [...materialQK.stockToSGF(), uuid],

	// trx against order description
	trxAgainstOrderDescription: () => [
		...materialQK.all(),
		'trx-against-order-description',
	],
	trxAgainstOrderDescriptionByUUID: (uuid: string) => [
		...materialQK.trxAgainstOrderDescription(),
		uuid,
	],
};

// Purchase Query Keys
export const purchaseQK = {
	all: () => ['purchase'],

	// vendor
	vendor: () => [...purchaseQK.all(), 'vendor'],
	vendorByUUID: (uuid: string) => [...purchaseQK.vendor(), uuid],

	// description
	description: () => [...purchaseQK.all(), 'description'],
	descriptionByUUID: (uuid: string) => [...purchaseQK.description(), uuid],

	// entry
	entry: () => [...purchaseQK.all(), 'entry'],
	entryByUUID: (uuid: string) => [...purchaseQK.entry(), uuid],

	// details
	details: () => [...purchaseQK.all(), 'details'],
	detailsByUUID: (uuid: string) => [...purchaseQK.details(), uuid],

	// log
	log: () => [...purchaseQK.all(), 'log'],
};
