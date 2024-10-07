import { useTQuery } from '@/hooks';

import { materialQK, purchaseQK } from './queryKeys';

// Material Section
export const useMaterialSection = <T>() =>
	useTQuery<T>({
		queryKey: materialQK.section(),
		url: '/material/section',
	});

export const useMaterialSectionByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: materialQK.sectionByUUID(uuid),
		url: `/material/section/${uuid}`,
		enabled: !!uuid,
	});

// Material Type
export const useMaterialType = <T>() =>
	useTQuery<T>({
		queryKey: materialQK.type(),
		url: '/material/type',
	});

export const useMaterialTypeByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: materialQK.typeByUUID(uuid),
		url: `/material/type/${uuid}`,
		enabled: !!uuid,
	});

// Material Info
export const useMaterialInfo = <T>() =>
	useTQuery<T>({
		queryKey: materialQK.info(),
		url: '/material/info',
	});

export const useMaterialInfoByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: materialQK.infoByUUID(uuid),
		url: `/material/info/${uuid}`,
		enabled: !!uuid,
	});

// Material Trx
export const useMaterialTrx = <T>() =>
	useTQuery<T>({
		queryKey: materialQK.trx(),
		url: '/material/trx',
	});

export const useMaterialTrxByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: materialQK.trxByUUID(uuid),
		url: `/material/trx/${uuid}`,
		enabled: !!uuid,
	});

// Material Stock To SFG
export const useMaterialStockToSFG = <T>() =>
	useTQuery<T>({
		queryKey: materialQK.stockToSGF(),
		url: '/material/stock-to-sfg',
	});

export const useMaterialStockToSFGByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: materialQK.stockToSFGByUUID(uuid),
		url: `/material/stock-to-sfg/${uuid}`,
		enabled: !!uuid,
	});

// Purchase Vendor
export const usePurchaseVendor = <T>() =>
	useTQuery<T>({
		queryKey: purchaseQK.vendor(),
		url: '/purchase/vendor',
	});

export const usePurchaseVendorByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: purchaseQK.vendorByUUID(uuid),
		url: `/purchase/vendor/${uuid}`,
		enabled: !!uuid,
	});

// Purchase Description
export const usePurchaseDescription = <T>() =>
	useTQuery<T>({
		queryKey: purchaseQK.description(),
		url: '/purchase/description',
	});

export const usePurchaseDescriptionByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: purchaseQK.descriptionByUUID(uuid),
		url: `/purchase/description/${uuid}`,
		enabled: !!uuid,
	});

// Purchase Entry
export const usePurchaseEntry = <T>() =>
	useTQuery<T>({
		queryKey: purchaseQK.entry(),
		url: '/purchase/entry',
	});

export const usePurchaseEntryByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: purchaseQK.entryByUUID(uuid),
		url: `/purchase/entry/${uuid}`,
		enabled: !!uuid,
	});

// Purchase Details
export const usePurchaseDetailsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: purchaseQK.detailsByUUID(uuid),
		url: `/purchase/purchase-details/by/${uuid}`,
		enabled: !!uuid,
	});

// Purchase Log
export const usePurchaseLog = <T>() =>
	useTQuery<T>({
		queryKey: purchaseQK.log(),
		url: `/purchase/purchase-log`,
	});

// Material Trx Against Order
export const useMaterialTrxAgainstOrderDescription = <T>() =>
	useTQuery<T>({
		queryKey: materialQK.trxAgainstOrderDescription(),
		url: '/zipper/material-trx-against-order',
	});

export const useMaterialTrxAgainstOrderDescriptionByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: materialQK.trxAgainstOrderDescriptionByUUID(uuid),
		url: `/zipper/material-trx-against-order/${uuid}`,
		enabled: !!uuid,
	});
