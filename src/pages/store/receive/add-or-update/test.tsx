import { z } from 'zod';

import 'handsontable/dist/handsontable.full.min.css';

import { createRef, RefObject } from 'react';
import { BaseEditorComponent, HotColumn, HotTable } from '@handsontable/react';
import { DevTool } from '@hookform/devtools';
import Handsontable from 'handsontable';
import { registerAllModules } from 'handsontable/registry';
import { Plus } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/form-select';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import ReactSelect from '@/components/ui/react-select';

import { cn } from '@/lib/utils';
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

interface ITestProps {
	title?: string;
	extraButtons?: React.ReactNode[];
}

interface IProps {
	options: IFormSelectOption[];
}

// an editor component
class EditorComponent extends BaseEditorComponent<IProps> {
	mainElementRef: RefObject<HTMLDivElement>;
	options: IFormSelectOption[];

	constructor(props: BaseEditorComponent<IProps>['props']) {
		super(props);

		this.mainElementRef = createRef();
		this.state = {
			value: '',
		};
		this.options = this.props.options;
	}

	setValue(value: any, callback: (() => void) | undefined) {
		console.log({
			element: this?.props?.emitEditorInstance,
		});
		this.setState((_state, _props) => {
			return { value };
		}, callback);
	}

	getValue() {
		return this.state.value;
	}

	open() {
		if (!this.mainElementRef.current) return;
		this.mainElementRef.current.style.display = 'block';
	}

	close() {
		if (!this.mainElementRef.current) return;
		this.mainElementRef.current.style.display = 'none';
	}

	prepare(
		row: number,
		col: number,
		prop: string,
		td: HTMLTableColElement,
		originalValue: string,
		cellProperties: Handsontable.CellProperties
	) {
		// We'll need to call the `prepare` method from
		// the `BaseEditorComponent` class, as it provides
		// the component with the information needed to use the editor
		// (hotInstance, row, col, prop, TD, originalValue, cellProperties)
		super.prepare(row, col, prop, td, originalValue, cellProperties);

		const tdPosition = td.getBoundingClientRect();

		// As the `prepare` method is triggered after selecting
		// any cell, we're updating the styles for the editor element,
		// so it shows up in the correct position.
		if (!this.mainElementRef.current) return;
		this.mainElementRef.current.style.left = `${
			tdPosition.left + window.pageXOffset
		}px`;
		this.mainElementRef.current.style.top = `${
			tdPosition.top + window.pageYOffset
		}px`;

		this.mainElementRef.current.style.width = `${tdPosition.width}px`;
		this.mainElementRef.current.style.height = `${tdPosition.height}px`;
	}

	stopMousedownPropagation(e: MouseEvent) {
		e.stopPropagation();
	}

	render() {
		return (
			<div
				style={{
					display: 'none',
					position: 'absolute',
					// width: 'fit-content',
					// minWidth: '200px',
					background: '#fff',
					border: '1px solid #000',
					padding: '4px',
					zIndex: 999,
				}}
				ref={this.mainElementRef}
				onMouseDown={this.stopMousedownPropagation as any}
				id='editorElement'>
				<ReactSelect
					value={this.options.find(
						(option) => option.value === this.state.value
					)}
					options={this.options}
					onChange={(value: any) => {
						this.setValue(value?.value, () => {
							this.finishEditing();
						});
					}}
				/>
			</div>
		);
	}
}

type RendererProps = {
	TD?: HTMLTableCellElement;
	value?: string | number;
	row?: number;
	col?: number;
	cellProperties?: Handsontable.CellProperties;
};

const RendererComponent = (props: RendererProps) => {
	// the available renderer-related props are:
	// - `row` (row index)
	// - `col` (column index)
	// - `prop` (column property name)
	// - `TD` (the HTML cell element)
	// - `cellProperties` (the `cellProperties` object for the edited cell)

	return (
		<div className='p-2'>
			<ReactSelect
			// classNames={{
			// 	control: (base) => cn(base),
			// }}
			/>
		</div>
	);
	return (
		<>
			<i style={{ color: '#a9a9a9' }}>
				Row: {props.row}, column: {props.col},
			</i>{' '}
			value: {props.value}
		</>
	);
};

const Test: React.FC<ITestProps> = ({ title, extraButtons }) => {
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

				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-6 rounded-b-md border border-t-0'>
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
						// headerClassName='h-8 flex items-center whitespace-nowrap px-3 text-left align-middle text-sm font-medium tracking-wide text-primary first:pl-6 dark:text-neutral-400 [&:has([role=checkbox])]:pr-0 bg-base-200'
						afterChange={(changes, source) => {
							changes?.forEach(
								([row, prop, oldValue, newValue]) => {
									form.setValue(
										`employees.${row}.${prop as keyof ITest['employees'][0]}`,
										newValue
									);
								}
							);
						}}
						licenseKey='non-commercial-and-evaluation' // for non-commercial use only
					>
						{Object.keys(data[0]).map((key) => (
							<HotColumn key={key} data={key}>
								<EditorComponent
									hot-editor
									options={[
										{
											label: 'Name',
											value: 'name',
										},
									]}
								/>

								<RendererComponent hot-renderer />
							</HotColumn>
						))}
					</HotTable>

					{/* <Button>Submit</Button> */}

					<DevTool control={form.control} />
				</form>
			</div>
		</Form>
	);

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
