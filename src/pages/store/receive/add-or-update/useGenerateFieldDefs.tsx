import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action-button';
import { FieldDef } from '@/components/core/form/form-dynamic-fields';
import { IFormSelectOption } from '@/components/core/form/form-select';

import { useOtherMaterial } from '@/lib/common-queries/other';

import { IReceive } from '../../_config/schema';

interface IGenerateFieldDefsProps {
	copy: (index: number) => void;
	remove: (index: number) => void;
	watch?: UseFormWatch<IReceive>;
}

const useGenerateFieldDefs = ({
	copy,
	remove,
	watch,
}: IGenerateFieldDefsProps): FieldDef[] => {
	const { data: material } =
		useOtherMaterial<(IFormSelectOption & { unit: string })[]>();

	return [
		{
			header: 'Material',
			accessorKey: 'material_uuid',
			type: 'select',
			placeholder: 'Select Material',
			options: material || [],
			className: 'min-w-[200px]',
		},
		{
			header: 'Quantity',
			accessorKey: 'quantity',
			type: 'number',
			className: 'min-w-[100px]',
		},
		{
			header: 'Price',
			accessorKey: 'price',
			type: 'join-input-unit',
			unit: (index: number) =>
				material?.find(
					(item) =>
						item.value.toString() ===
						watch?.(`purchase.${index}.material_uuid`)
				)?.unit || '',
			inputType: 'number',
			className: 'min-w-[100px]',
		},
		{
			header: 'Remarks',
			accessorKey: 'remarks',
			type: 'text',
			className: 'min-w-[200px]',
		},
		{
			header: 'Actions',
			accessorKey: 'actions',
			type: 'custom',
			component: (field: any, index: number) => {
				return (
					<FieldActionButton
						handleCopy={copy}
						handleRemove={remove}
						index={index}
					/>
				);
			},
		},
	];
};

export default useGenerateFieldDefs;
