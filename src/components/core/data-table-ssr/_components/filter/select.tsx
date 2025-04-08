import { ITableFilterOptionSSR } from '@/types';
import useTableFilter from '@/hooks/useTableFilter';
import useTQuery from '@/hooks/useTQuery';

import { IFormSelectOption } from '@/components/core/form/types';
import ReactSelectAsync from '@/components/ui/react-select-async';

function Select<T>({ label, accessor, apiUrl }: ITableFilterOptionSSR<T>) {
	const { addFilter, filters } = useTableFilter();

	const { data } = useTQuery<IFormSelectOption[]>({
		queryKey: [label, accessor.toString()],
		url: apiUrl!,
	});

	const promiseOptions = (inputValue: string) => {
		return new Promise<IFormSelectOption[]>((resolve) => {
			resolve(data?.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase())) || []);
		});
	};

	return (
		<ReactSelectAsync
			onChange={(option: any) => {
				addFilter(accessor as string, option?.value as string);
			}}
			value={
				(data?.find(
					(option) => option.value === filters?.find((filter) => filter.name === accessor)?.value
				) as any) || null
			}
			cacheOptions
			loadOptions={promiseOptions}
			defaultOptions={data?.slice(0, 10) as any}
		/>
	);
}

export default Select;
