import { ErrorMessage } from '@hookform/error-message';
import Handsontable from 'handsontable';
import { useFormContext } from 'react-hook-form';

import { FieldDef } from '@/components/core/form/form-dynamic-fields';
import { Input } from '@/components/ui/input';
import ReactSelect from '@/components/ui/react-select';
import { Skeleton } from '@/components/ui/skeleton';

type ICustomRendererProps = {
	TD?: HTMLTableCellElement;
	value?: string | number;
	row?: number;
	col?: number;
	cellProperties?: Handsontable.CellProperties;
	field: FieldDef;
	fieldName: string;
};

// Custom renderer Component
const CustomRenderer = (props: ICustomRendererProps) => {
	const {
		watch,
		formState: { errors },
	} = useFormContext();

	if (props.field.isLoading) {
		return (
			<div>
				<Skeleton className='h-6 w-full' />
			</div>
		);
	}
	return (
		<div className='bg-gradient'>
			<div className='h-10'>
				{props.field.type === 'select' && (
					<ReactSelect
						placeholder={
							props.field.placeholder || 'Select an option'
						}
						value={props.field.options.find(
							(option) => option.value === props.value
						)}
						extraControlClassName='!min-h-6 !h-6 !rounded-none !border-none !bg-transparent'
						isClearable={false}
					/>
				)}

				{props.field.type === 'input' && (
					<div className='relative w-full'>
						<Input
							type='text'
							placeholder={
								props.field.placeholder || 'Write here'
							}
							className='absolute bottom-0 left-0 right-0 top-0 h-6 w-auto rounded-none border-none bg-transparent'
							value={watch(
								`${props.fieldName}.${props.row}.${props.field.accessorKey}`
							)}
							onChange={(e) => {}}
						/>
					</div>
				)}

				{props.field.type === 'custom' && (
					<div className='flex h-full items-center bg-transparent px-2'>
						{props.field.component(props.row || 0)}
					</div>
				)}
			</div>

			<ErrorMessage
				errors={errors}
				name={`${props.fieldName}.${props.row}.${props.field.accessorKey}`}
				render={({ message }) => (
					<p className='pb-2 pl-3 text-sm font-medium text-destructive'>
						{message}
					</p>
				)}
			/>
		</div>
	);
};

export default CustomRenderer;
