import { useEffect, useState } from 'react';
import { allFlatRoutes } from '@/routes';
import { IResponse } from '@/types';
import { getDateTime } from '@/utils';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { useRHF } from '@/hooks';

import CoreForm from '@/components/core/form';
import { AddModal } from '@/components/core/modal';
import { Checkbox } from '@/components/ui/checkbox';
import DebouncedInput from '@/components/ui/debounce-input';
import { FormField } from '@/components/ui/form';

import { IPageAssign } from '../_const/columns/columns.type';
import { useHrCanAccess } from '../_const/query';

interface IPageAssignProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IPageAssign | null;
	setUpdatedData?: React.Dispatch<React.SetStateAction<IPageAssign | null>>;
	updateData: UseMutationResult<
		IResponse<any>,
		AxiosError<IResponse<any>, any>,
		{
			url: string;
			updatedData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
}

const PageAssign: React.FC<IPageAssignProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	updateData,
}) => {
	const { data } = useHrCanAccess<any>(updatedData?.uuid as string);
	const ALL_PAGE_ACTIONS = allFlatRoutes.filter(
		(item) => item.actions !== undefined && item.actions.length > 0
	);
	const [searchPageName, setSearchPageName] = useState('');
	const filteredPageActions = ALL_PAGE_ACTIONS.filter(({ page_name }) =>
		page_name?.toLowerCase().includes(searchPageName.toLowerCase())
	);

	const PAGE_ACTIONS = ALL_PAGE_ACTIONS.reduce(
		(
			acc: {
				[key: string]: z.ZodType<any>;
			},
			{ page_name, actions }
		) => {
			actions?.forEach((action) => {
				const key = page_name + '___' + action;
				acc[key] = z.boolean().default(false);
			});
			return acc;
		},
		{}
	);

	const PAGE_ASSIGN_SCHEMA = z.object({
		...PAGE_ACTIONS,
	});

	const PAGE_ASSIGN_NULL = {};

	const form = useRHF(PAGE_ASSIGN_SCHEMA);

	useEffect(() => {
		if (data?.[0] === undefined || data?.[0]['can_access'] === null) {
			form.reset(PAGE_ASSIGN_NULL);
			return;
		}

		const result: { [key: string]: boolean } = {};

		Object.entries(data?.[0])?.forEach(([key, value]) => {
			const val = JSON.parse(value as string);

			Object.entries(val).forEach(([k, v]: any) => {
				v.forEach((item: any) => {
					const obj_key = k + '___' + item;
					result[obj_key] = true;
				});
			});
		});

		const filterRoutes = allFlatRoutes?.filter(
			(item) => item.actions !== undefined
		);

		const PAGE_ACTIONS = filterRoutes?.reduce(
			(
				acc: {
					[key: string]: boolean;
				},
				{ page_name, actions }
			) => {
				actions?.forEach((action) => {
					const key = page_name + '___' + action;

					acc[key] = result?.[key] === true ? true : false;
				});
				return acc;
			},
			{}
		);

		form.reset(PAGE_ACTIONS);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(PAGE_ASSIGN_NULL);
		setOpen((prev) => !prev);
	};

	// Submit handler
	async function onSubmit(values: { [key: string]: boolean }) {
		const result: { [key: string]: string[] } = {};

		Object.entries(values).forEach(([key, value]) => {
			if (value) {
				const [page_name, action] = key.split('___');
				if (!result[page_name]) {
					result[page_name] = [];
				}
				result[page_name].push(action);
			}
		});

		await updateData.mutateAsync({
			url,
			updatedData: {
				can_access: JSON.stringify(result),
				updated_at: getDateTime(),
			},
			onClose,
		});
	}

	return (
		<AddModal
			isSmall
			open={open}
			setOpen={onClose}
			title={'Page Assign : ' + updatedData?.name}
			form={form}
			onSubmit={onSubmit}>
			<DebouncedInput
				icon={<Search className='size-4 text-secondary/50' />}
				width='mb-4'
				placeholder='Search Page Name...'
				value={searchPageName ?? ''}
				onChange={(val) => setSearchPageName(val as string)}
			/>

			<div className='h-80 space-y-2.5 overflow-auto rounded-md p-2 shadow-xl'>
				{filteredPageActions.length === 0 ? (
					<div className='text-error flex h-full animate-pulse items-center justify-center py-6 text-center text-2xl font-semibold'>
						No page found
					</div>
				) : (
					filteredPageActions.map(({ page_name, actions, path }) => {
						return (
							<div
								key={page_name}
								className='flex flex-col gap-2 rounded-md border p-3 pt-1 transition-colors duration-300 ease-in-out hover:bg-base-150'>
								<div className='flex items-center justify-between'>
									<Link
										to={path!}
										className='font-semibold capitalize hover:underline'
										target='_blank'>
										{page_name
											?.replace(/__/, ': ')
											.replace(/_/g, ' ')}
									</Link>
									<Checkbox
										id={page_name + '___' + 'all'}
										checked={
											actions
												?.map((action) =>
													form.watch(
														page_name +
															'___' +
															action
													) == 'false' ||
													!form.watch(
														page_name +
															'___' +
															action
													)
														? false
														: true
												)
												.includes(false)
												? false
												: true
										}
										onCheckedChange={(value) => {
											if (value) {
												actions?.forEach((action) => {
													form.setValue(
														page_name +
															'___' +
															action,
														true,
														{
															shouldTouch: true,
															shouldDirty: true,
															shouldValidate:
																true,
														}
													);
												});
											} else {
												actions?.forEach((action) => {
													form.setValue(
														page_name +
															'___' +
															action,
														false,
														{
															shouldTouch: true,
															shouldDirty: true,
															shouldValidate:
																true,
														}
													);
												});
											}
										}}
									/>
								</div>

								<div className='flex flex-wrap gap-2'>
									{actions?.map((action) => (
										<div
											key={page_name + '___' + action}
											className='rounded-md border p-1'>
											<FormField
												control={form.control}
												name={
													page_name + '___' + action
												}
												render={(props) => (
													<CoreForm.Checkbox
														label={action.replace(
															/_/g,
															' '
														)}
														defaultChecked={form.getValues(
															page_name +
																'___' +
																action
														)}
														{...props}
													/>
												)}
											/>
										</div>
									))}
								</div>
							</div>
						);
					})
				)}
			</div>
		</AddModal>
	);
};

export default PageAssign;
