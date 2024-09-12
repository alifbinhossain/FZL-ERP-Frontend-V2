import { useTQuery } from '@/hooks';
import { materialQK, purchaseQK } from './queryKeys';

// Material Section
export const useMaterialSection = () =>
	useTQuery({
		queryKey: materialQK.section(),
		url: '/material/section',
	});

export const useMaterialSectionByUUID = (uuid: string) =>
	useTQuery({
		queryKey: materialQK.sectionByUUID(uuid),
		url: `/material/section/${uuid}`,
		enabled: !!uuid,
	});

// Material Type
export const useMaterialType = () =>
	useTQuery({
		queryKey: materialQK.type(),
		url: '/material/type',
	});

export const useMaterialTypeByUUID = (uuid: string) =>
	useTQuery({
		queryKey: materialQK.typeByUUID(uuid),
		url: `/material/type/${uuid}`,
		enabled: !!uuid,
	});

// Material Info
export const useMaterialInfo = () =>
	useTQuery({
		queryKey: materialQK.info(),
		url: '/material/info',
	});

export const useMaterialInfoByUUID = (uuid: string) =>
	useTQuery({
		queryKey: materialQK.infoByUUID(uuid),
		url: `/material/info/${uuid}`,
		enabled: !!uuid,
	});

// Material Trx
export const useMaterialTrx = () =>
	useTQuery({
		queryKey: materialQK.trx(),
		url: '/material/trx',
	});

export const useMaterialTrxByUUID = (uuid: string) =>
	useTQuery({
		queryKey: materialQK.trxByUUID(uuid),
		url: `/material/trx/${uuid}`,
		enabled: !!uuid,
	});

// Material Stock To SFG
export const useMaterialStockToSFG = () =>
	useTQuery({
		queryKey: materialQK.stockToSGF(),
		url: '/material/stock-to-sfg',
	});

export const useMaterialStockToSFGByUUID = (uuid: string) =>
	useTQuery({
		queryKey: materialQK.stockToSFGByUUID(uuid),
		url: `/material/stock-to-sfg/${uuid}`,
		enabled: !!uuid,
	});

// Purchase Vendor
export const usePurchaseVendor = () =>
	useTQuery({
		queryKey: purchaseQK.vendor(),
		url: '/purchase/vendor',
	});

export const usePurchaseVendorByUUID = (uuid: string) =>
	useTQuery({
		queryKey: purchaseQK.vendorByUUID(uuid),
		url: `/purchase/vendor/${uuid}`,
		enabled: !!uuid,
	});

// Purchase Description
export const usePurchaseDescription = () =>
	useTQuery({
		queryKey: purchaseQK.description(),
		url: '/purchase/description',
	});

export const usePurchaseDescriptionByUUID = (uuid: string) =>
	useTQuery({
		queryKey: purchaseQK.descriptionByUUID(uuid),
		url: `/purchase/description/${uuid}`,
		enabled: !!uuid,
	});

// Purchase Entry
export const usePurchaseEntry = () =>
	useTQuery({
		queryKey: purchaseQK.entry(),
		url: '/purchase/entry',
	});

export const usePurchaseEntryByUUID = (uuid: string) =>
	useTQuery({
		queryKey: purchaseQK.entryByUUID(uuid),
		url: `/purchase/entry/${uuid}`,
		enabled: !!uuid,
	});

// Purchase Details
export const usePurchaseDetailsByUUID = (uuid: string) =>
	useTQuery({
		queryKey: purchaseQK.detailsByUUID(uuid),
		url: `/purchase/purchase-details/by/${uuid}`,
		enabled: !!uuid,
	});

// Purchase Log
export const usePurchaseLog = () =>
	useTQuery({
		queryKey: purchaseQK.log(),
		url: `/purchase/purchase-log`,
	});

// Material Trx Against Order
export const useMaterialTrxAgainstOrderDescription = () =>
	useTQuery({
		queryKey: materialQK.trxAgainstOrderDescription(),
		url: '/zipper/material-trx-against-order',
	});

export const useMaterialTrxAgainstOrderDescriptionByUUID = (uuid: string) =>
	useTQuery({
		queryKey: materialQK.trxAgainstOrderDescriptionByUUID(uuid),
		url: `/zipper/material-trx-against-order/${uuid}`,
		enabled: !!uuid,
	});
