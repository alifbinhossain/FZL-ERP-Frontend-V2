import { Plus } from 'lucide-react';
import { FieldArrayWithId, UseFormReturn } from 'react-hook-form';

import CoreForm from '@/components/core/form';
import { IFormSelectOption } from '@/components/core/form/form-select';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { cn } from '@/lib/utils';

type FieldReadonly = {
	type: 'readOnly';
};
type FieldCustom = {
	type: 'custom';
	component: (field: FieldArrayWithId<any>, index: number) => React.ReactNode;
};

type FieldText = {
	type: 'text';
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
} & (
	| FieldText
	| FieldNumber
	| FieldSelect
	| FieldReadonly
	| FieldCustom
	| FieldJoinInputUnit
);

interface DynamicFieldsProps {
	title: string;
	form: UseFormReturn<any>;
	fieldName: string;
	fieldDefs: FieldDef[];
	extraButtons?: React.ReactNode[];
	handleAdd?: () => void;
	fields: FieldArrayWithId<any>[];
}

const FormDynamicFields = ({
	title,
	form,
	fieldName,
	fieldDefs,
	extraButtons,
	handleAdd,
	fields,
}: DynamicFieldsProps) => {
	return (
		<div className='overflow-hidden rounded-md shadow-sm'>
			<div className='flex items-center justify-between bg-primary py-2 pl-4 pr-2'>
				<h3 className='text-lg font-medium text-primary-foreground'>
					{title || 'Dynamic Fields'}
				</h3>

				<div className='flex items-center gap-2'>
					{extraButtons &&
						extraButtons.length > 0 &&
						extraButtons.map((button) => button)}

					{handleAdd && (
						<Button
							onClick={handleAdd}
							type='button'
							variant={'accent'}
							size={'xs'}
							className='gap-1 rounded bg-transparent bg-gradient-to-r from-accent/80 to-accent/70'>
							<Plus className='size-4' />
							New
						</Button>
					)}
				</div>
			</div>
			<div className='rounded-b-md border border-t-0'>
				<Table className='overflow-x-auto'>
					<TableHeader>
						<TableRow className='h-8 divide-x-[1px]'>
							{fieldDefs
								.map((field) => field.header)
								.map((header) => (
									<TableHead key={header}>{header}</TableHead>
								))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{fields.length === 0 && (
							<TableRow>
								<TableCell
									className='text-center'
									colSpan={fieldDefs.length}>
									<p className='text-destructive'>
										No fields added yet
									</p>
								</TableCell>
							</TableRow>
						)}
						{fields.length > 0 &&
							fields.map((field, fieldIndex) => (
								<TableRow
									key={field.id}
									className='divide-x-[1px] hover:bg-base-150'>
									{fieldDefs.map((fieldDef) => (
										<TableCell
											className={cn(
												'first:pl-2 last:pr-2',
												fieldDef.className
											)}
											key={fieldDef.accessorKey}>
											{fieldDef.type === 'readOnly' &&
												field[
													fieldDef.accessorKey as keyof typeof field
												]}

											{fieldDef.type === 'custom' &&
												fieldDef.component(
													field,
													fieldIndex
												)}

											{fieldDef.type ===
												'join-input-unit' && (
												<FormField
													control={form.control}
													name={`${fieldName}.${fieldIndex}.${fieldDef.accessorKey}`}
													render={(props) => (
														<CoreForm.JoinInputUnit
															unit={fieldDef.unit(
																fieldIndex
															)}
															disableLabel
															type={
																fieldDef.inputType
															}
															{...props}
														/>
													)}
												/>
											)}

											{fieldDef.type === 'text' && (
												<FormField
													control={form.control}
													name={`${fieldName}.${fieldIndex}.${fieldDef.accessorKey}`}
													render={(props) => (
														<CoreForm.Input
															disableLabel
															{...props}
														/>
													)}
												/>
											)}

											{fieldDef.type === 'number' && (
												<FormField
													control={form.control}
													name={`${fieldName}.${fieldIndex}.${fieldDef.accessorKey}`}
													render={(props) => (
														<CoreForm.Input
															type='number'
															disableLabel
															{...props}
														/>
													)}
												/>
											)}

											{fieldDef.type === 'select' && (
												<FormField
													control={form.control}
													name={`${fieldName}.${fieldIndex}.${fieldDef.accessorKey}`}
													render={(props) => (
														<CoreForm.ReactSelect
															menuPortalTarget={
																document.body
															}
															options={
																fieldDef.options
															}
															placeholder={
																fieldDef.placeholder
															}
															disableLabel
															{...props}
														/>
													)}
												/>
											)}
										</TableCell>
									))}
								</TableRow>
							))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default FormDynamicFields;
