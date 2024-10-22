import { FieldArrayWithId, UseFormReturn } from 'react-hook-form';

import { IFormSelectOption } from '@/components/core/form/form-select';

import DynamicFieldContainer from './_components/container';
import DefaultDynamicFields from './_components/default';
import SpreadsheetDynamicFields from './_components/spreadsheet';

type FieldReadonly = {
	type: 'readOnly';
};
type FieldCustom = {
	type: 'custom';
	component: (index: number) => React.ReactNode;
};

type FieldText = {
	type: 'input';
	inputType?: 'text' | 'number';
	placeholder?: string;
};
type FieldNumber = {
	type: 'number';
	placeholder?: string;
};

type FieldSelect = {
	type: 'select';
	placeholder?: string;
	options: IFormSelectOption[];
};

type FieldJoinInputUnit = {
	type: 'join-input-unit';
	placeholder?: string;
	unit: (index: number) => string;
	inputType?: string;
};

export type FieldDef = {
	header: string;
	accessorKey: string;
	className?: string;
	isLoading?: boolean;
	hidden?: boolean;
} & (
	| FieldText
	| FieldNumber
	| FieldSelect
	| FieldReadonly
	| FieldCustom
	| FieldJoinInputUnit
);

export interface DynamicFieldsProps {
	title: string;
	form: UseFormReturn<any>;
	fieldName: string;
	fieldDefs: FieldDef[];
	extraButtons?: React.ReactNode[];
	handleAdd?: () => void;
	fields: FieldArrayWithId<any>[];
	viewAs?: 'default' | 'spreadsheet';
}

const FormDynamicFields = (props: DynamicFieldsProps) => {
	return (
		<DynamicFieldContainer
			title={props.title}
			extraButtons={props.extraButtons}
			handleAdd={props.handleAdd}>
			{props.viewAs === 'spreadsheet' ? (
				<SpreadsheetDynamicFields {...props} />
			) : (
				<DefaultDynamicFields {...props} />
			)}
		</DynamicFieldContainer>
	);
};

export default FormDynamicFields;
