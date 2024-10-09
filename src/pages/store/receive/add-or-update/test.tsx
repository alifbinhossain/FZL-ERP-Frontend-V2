import React, { createRef, RefObject } from 'react';
import { z } from 'zod';

import 'handsontable/dist/handsontable.full.min.css';

import { BaseEditorComponent, HotColumn, HotTable } from '@handsontable/react';
import { DevTool } from '@hookform/devtools';
import { registerAllModules } from 'handsontable/registry';
import { useFieldArray } from 'react-hook-form';
import { useRHF } from '@/hooks';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { STRING_REQUIRED } from '@/utils/validators';

registerAllModules();

const TEST_SCHEMA = z.object({
	employees: z.array(
		z.object({
			name: STRING_REQUIRED,
			address: STRING_REQUIRED,
			number: STRING_REQUIRED,
			department: STRING_REQUIRED,
		})
	),
});

const TEST_NULL: Partial<ITest> = {
	employees: [
		{
			name: 'Alif',
			address: 'Dhaka',
			number: '01660141086',
			department: 'IT',
		},
	],
};

type ITest = z.infer<typeof TEST_SCHEMA>;

const Test = () => {
	const form = useRHF(TEST_SCHEMA, TEST_NULL);

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'employees',
	});

	const onSubmit = (data: ITest) => {
		console.log(data);
	};

	const handleAdd = () => {
		append({
			name: '',
			address: '',
			number: '',
			department: '',
		});
	};

	const columnHeaders = [
		'Name',
		'Address',
		'Number',
		'Department',
		'Actions',
	];
	const data = fields.map((field) => ({
		name: field.name,
		address: field.address,
		number: field.number,
		department: field.department,
	}));

	data.forEach((item, index) => {
		Object.keys(item).forEach((key) => {
			form.register(
				`employees.${index}.${key as keyof ITest['employees'][0]}`
			);
		});
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
				<Button type='button' onClick={handleAdd} size={'sm'}>
					Add new
				</Button>
				<HotTable
					layoutDirection='ltr'
					data={data}
					rowHeaders={false}
					colHeaders={columnHeaders}
					height='auto'
					width='100%'
					stretchH='all'
					autoWrapRow={true}
					autoWrapCol={true}
					customBorders={true}
					afterChange={(changes, source) => {
						changes?.forEach(([row, prop, oldValue, newValue]) => {
							form.setValue(
								`employees.${row}.${prop as keyof ITest['employees'][0]}`,
								newValue
							);
						});
					}}
					licenseKey='non-commercial-and-evaluation' // for non-commercial use only
				>
					{Object.keys(data[0]).map((key) => (
						<HotColumn key={key} data={key} />
					))}
				</HotTable>

				<Button>Submit</Button>

				<DevTool control={form.control} />
			</form>
		</Form>
	);
};

export default Test;
