import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FieldDef } from '@/components/core/form/form-dynamic-fields/types';
import { IFormSelectOption } from '@/components/core/form/types';

import { useOtherMaterial } from '@/lib/common-queries/other';

import { IReceive } from '../../_config/schema';

interface IGenerateFieldDefsProps {
	copy: (index: number) => void;
	remove: (index: number) => void;
	watch?: UseFormWatch<IReceive>;
}

const useGenerateFieldDefs = ({ copy, remove, watch }: IGenerateFieldDefsProps): FieldDef[] => {
	const { data: material, isLoading } = useOtherMaterial<(IFormSelectOption & { unit: string })[]>();

	return [
		{
			header: 'Material',
			accessorKey: 'material_uuid',
			type: 'select',
			placeholder: 'Select Material',
			options: material || [],
			className: 'min-w-[200px]',
			isLoading,
		},
		{
			header: 'Quantity',
			accessorKey: 'quantity',
			type: 'join-input-unit',
			unit: (index: number) =>
				material?.find((item) => item.value.toString() === watch?.(`purchase.${index}.material_uuid`))?.unit ||
				'',
			className: 'min-w-[100px]',
		},
		{
			header: 'Price',
			accessorKey: 'price',
			type: 'number',
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
			component: (index: number) => {
				return <FieldActionButton handleCopy={copy} handleRemove={remove} index={index} />;
			},
		},
	];
};

export default useGenerateFieldDefs;
