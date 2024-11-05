import useDateRange from '@/hooks/useDateRange';
import useTQuery from '@/hooks/useTQuery';

import addUrlParams from '@/utils/routes/addUrlParams';

import { orderQK } from './queryKeys';

// * Details * //
export const useOrderDetails = <T>() =>
	useTQuery<T>({
		queryKey: orderQK.details(),
		url: '/zipper/order/details',
	});

export const useOrderDetailsByQuery = <T>(query: string) =>
	useTQuery<T>({
		queryKey: orderQK.detailsByQuery(query),
		url: `/zipper/order/details${query}`,
		enabled: !!query,
	});

export const useOrderDetailsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: orderQK.detailsByUUID(uuid),
		url: `/zipper/order-detail/${uuid}`,
		enabled: !!uuid,
	});

export const useOrderDetailsByOrderNumber = <T>(orderNumber: string) =>
	useTQuery<T>({
		queryKey: orderQK.detailsByOrderNumber(orderNumber),
		url: `/zipper/order/details/single-order/by/${orderNumber}`,
		enabled: !!orderNumber,
	});

// * Description * //
export const useOrderDescription = <T>() =>
	useTQuery<T>({
		queryKey: orderQK.description(),
		url: '/zipper/order-description',
	});

export const useOrderDescriptionByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: orderQK.descriptionByUUID(uuid),
		url: `/zipper/order-description/${uuid}`,
		enabled: !!uuid,
	});

// * Entry * //
export const useOrderEntries = <T>() =>
	useTQuery<T>({
		queryKey: orderQK.entry(),
		url: '/zipper/order-entry',
	});

export const useOrderEntriesByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: orderQK.entryByUUID(uuid),
		url: `/zipper/order-entry/${uuid}`,
		enabled: !!uuid,
	});

// * Buyer * //
export const useOrderBuyer = <T>() =>
	useTQuery<T>({
		queryKey: orderQK.buyer(),
		url: '/public/buyer',
	});

export const useOrderBuyerByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: orderQK.buyerByUUID(uuid),
		url: `/public/buyer/${uuid}`,
		enabled: !!uuid,
	});

//*Party */
export const useOrderParty = <T>() =>
	useTQuery<T>({
		queryKey: orderQK.party(),
		url: '/public/party',
	});
export const useOrderPartyByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: orderQK.partyByUUID(uuid),
		url: `/public/party/${uuid}`,
		enabled: !!uuid,
	});

// * Marketing * //
export const useOrderMarketing = <T>() =>
	useTQuery<T>({
		queryKey: orderQK.marketing(),
		url: '/public/marketing',
	});

export const useOrderMarketingByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: orderQK.marketingByUUID(uuid),
		url: `/public/marketing/${uuid}`,
		enabled: !!uuid,
	});

// * Factory * //
export const useOrderFactory = <T>() =>
	useTQuery<T>({
		queryKey: orderQK.factory(),
		url: '/public/factory',
	});

export const useOrderFactoryByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: orderQK.factoryByUUID(uuid),
		url: `/public/factory/${uuid}`,
		enabled: !!uuid,
	});

// * Merchandiser * //
// export const useOrderMerchandiser = <T>() => {
// 	const { limit, page } = useQueryParams();
// 	return useTQuery<T>({
// 		queryKey: orderQK.merchandiserPagination({ limit, page }),
// 		url: addUrlParams('/public/merchandiser', { limit, page }),
// 	});
// };

type IUseOrderMerchandiserProps = {
	formatted_start_date: string;
	formatted_end_date: string;
};

export const useOrderMerchandiser = <T>({
	formatted_start_date,
	formatted_end_date,
}: IUseOrderMerchandiserProps) => {
	return useTQuery<T>({
		queryKey: orderQK.merchandiserQuery({
			start_date: formatted_start_date,
			end_date: formatted_end_date,
		}),
		url: addUrlParams(`/public/merchandiser`, {
			start_date: formatted_start_date,
			end_date: formatted_end_date,
		}),
	});
};

export const useOrderMerchandiserByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: orderQK.merchandiserByUUID(uuid),
		url: `/public/merchandiser/${uuid}`,
		enabled: !!uuid,
	});

// * Properties * //
export const useOrderProperties = <T>() =>
	useTQuery<T>({
		queryKey: orderQK.properties(),
		url: '/public/properties',
	});
export const useOrderPropertiesByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: orderQK.propertiesByUUID(uuid),
		url: `/public/properties/${uuid}`,
		enabled: !!uuid,
	});

// * Info * //
export const useOrderInfo = <T>() =>
	useTQuery<T>({
		queryKey: orderQK.info(),
		url: '/zipper/order-info',
	});

export const useOrderInfoByUUID = <T>(uuid: string) => {
	useTQuery<T>({
		queryKey: orderQK.infoByUUID(uuid),
		url: `/zipper/order-info/${uuid}`,
		enabled: !!uuid,
	});
};
