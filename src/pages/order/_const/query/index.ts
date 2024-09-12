import { useTQuery } from '@/hooks';
import { orderQK } from './queryKeys';

// Details
export const useOrderDetails = () =>
	useTQuery({
		queryKey: orderQK.detail(),
		url: '/zipper/order/details',
	});

export const useOrderDetailsByUUID = (uuid: string) =>
	useTQuery({
		queryKey: orderQK.detailByUUID(uuid),
		url: `/zipper/order-detail/${uuid}`,
	});

export const useOrderDetailsByOrderNumber = (orderNumber: string) =>
	useTQuery({
		queryKey: orderQK.detailByOrderNumber(orderNumber),
		url: `/zipper/order/details/single-order/by/${orderNumber}`,
	});

// Description
export const useOrderDescription = () =>
	useTQuery({
		queryKey: orderQK.description(),
		url: '/zipper/order-description',
	});

export const useOrderDescriptionByUUID = (uuid: string) =>
	useTQuery({
		queryKey: orderQK.descriptionByUUID(uuid),
		url: `/zipper/order-description/${uuid}`,
	});

// Entry
export const useOrderEntry = () =>
	useTQuery({
		queryKey: orderQK.entry(),
		url: '/zipper/order-entry',
	});

export const useOrderEntryByUUID = (uuid: string) =>
	useTQuery({
		queryKey: orderQK.entryByUUID(uuid),
		url: `/zipper/order-entry/${uuid}`,
	});

// Buyer
export const useOrderBuyer = () =>
	useTQuery({
		queryKey: orderQK.buyer(),
		url: '/public/buyer',
	});

export const useOrderBuyerByUUID = (uuid: string) =>
	useTQuery({
		queryKey: orderQK.buyerByUUID(uuid),
		url: `/public/buyer/${uuid}`,
	});

// Party
export const useOrderParty = () =>
	useTQuery({
		queryKey: orderQK.party(),
		url: '/public/party',
	});
export const useOrderPartyByUUID = (uuid: string) =>
	useTQuery({
		queryKey: orderQK.partyByUUID(uuid),
		url: `/public/party/${uuid}`,
	});

// Marketing
export const useOrderMarketing = () =>
	useTQuery({
		queryKey: orderQK.marketing(),
		url: '/public/marketing',
	});

export const useOrderMarketingByUUID = (uuid: string) =>
	useTQuery({
		queryKey: orderQK.marketingByUUID(uuid),
		url: `/public/marketing/${uuid}`,
	});

// Factory
export const useOrderFactory = () =>
	useTQuery({
		queryKey: orderQK.factory(),
		url: '/public/factory',
	});

export const useOrderFactoryByUUID = (uuid: string) =>
	useTQuery({
		queryKey: orderQK.factoryByUUID(uuid),
		url: `/public/factory/${uuid}`,
	});

// Merchandiser
export const useOrderMerchandiser = () =>
	useTQuery({
		queryKey: orderQK.merchandiser(),
		url: '/public/merchandiser',
	});

export const useOrderMerchandiserByUUID = (uuid: string) => {
	useTQuery({
		queryKey: orderQK.merchandiserByUUID(uuid),
		url: `/public/merchandiser/${uuid}`,
	});
};

// Property
export const useOrderProperty = () =>
	useTQuery({
		queryKey: orderQK.property(),
		url: '/public/properties',
	});
export const useOrderPropertyByUUID = (uuid: string) =>
	useTQuery({
		queryKey: orderQK.propertyByUUID(uuid),
		url: `/public/properties/${uuid}`,
	});

// Info
export const useOrderInfo = () =>
	useTQuery({
		queryKey: orderQK.info(),
		url: '/zipper/order-info',
	});

export const useOrderInfoByUUID = (uuid: string) => {
	useTQuery({
		queryKey: orderQK.infoByUUID(uuid),
		url: `/zipper/order-info/${uuid}`,
	});
};
