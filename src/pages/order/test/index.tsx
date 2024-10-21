import React, { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';

import { buttonVariants } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { useOrderMerchandiser } from '../_config/query';

const Test = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const { data, pagination } = useOrderMerchandiser();

	useEffect(() => {
		setSearchParams({
			page: searchParams.get('page') || '1',
			limit: searchParams.get('limit') || '10',
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams]);

	const handlePageClick = (event: any) => {
		setSearchParams((prev) => ({
			limit: searchParams.get('limit') || '10',
			page: event.selected + 1,
		}));
	};

	return (
		<div>
			<pre>{JSON.stringify(data, null, 2)}</pre>

			<div>
				<Select
					value={searchParams.get('limit') || '10'}
					onValueChange={(value) =>
						setSearchParams((prev) => ({
							page: prev.get('page') || '1',
							limit: value,
						}))
					}>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Select an option' />
					</SelectTrigger>
					<SelectContent>
						{[10, 20, 30, 40, 50].map((pageSize) => (
							<SelectItem
								key={pageSize}
								value={pageSize.toString()}>
								{pageSize}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<ReactPaginate
					forcePage={
						pagination?.current_page
							? pagination?.current_page - 1
							: 0
					}
					pageLinkClassName={buttonVariants({
						variant: 'gradient',
						size: 'icon',
					})}
					activeLinkClassName={buttonVariants({
						variant: 'gradient-accent',
						size: 'icon',
					})}
					previousClassName='hidden'
					nextClassName='hidden'
					containerClassName='flex gap-1.5 items-stretch'
					breakLabel='...'
					onPageChange={handlePageClick}
					pageRangeDisplayed={2}
					pageCount={pagination?.total_page || 0}
					renderOnZeroPageCount={null}
				/>
			</div>
		</div>
	);
};

export default Test;
