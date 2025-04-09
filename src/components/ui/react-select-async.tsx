import { forwardRef } from 'react';
import { ChevronDown, Option, X } from 'lucide-react';
import Select, { ClassNamesConfig, components, Props, StylesConfig } from 'react-select';
import AsyncSelect, { AsyncProps } from 'react-select/async';

import { cn } from '@/lib/utils';

const selectStyles: StylesConfig = {
	input: (base) => ({
		...base,
	}),

	multiValueLabel(base) {
		return {
			...base,
			whiteSpace: 'normal',
			overflow: 'visible',
		};
	},
};

const classNames = (extraControlClassName?: string): ClassNamesConfig => ({
	control: ({ isFocused, isDisabled }) =>
		cn(
			'bg-gradient border-input text-foreground min-h-10 rounded-md border px-3 py-2 text-sm',
			isFocused && 'outline-secondary outline outline-2 outline-offset-2',
			isDisabled &&
				'border-destructive/50 from-destructive/5! to-destructive/5! text-destructive cursor-not-allowed',
			extraControlClassName
		),
	placeholder: () => 'text-muted-foreground text-sm',
	input: () => 'grow',
	singleValue: () => 'grow',
	multiValue: () => 'border border-input px-2 rounded bg-base-200',
	valueContainer: () => 'flex flex-wrap gap-2',
	menu: () => 'bg-base overflow-hidden  rounded shadow-2xl text-sm border border-input p-1',
	option: ({ isFocused, isSelected }) =>
		cn(
			'text-foreground rounded px-3 py-1.5 text-sm',
			isFocused && 'bg-base-200',
			isSelected && 'before:mr-1 before:content-["✔"]'
		),
	noOptionsMessage: () => 'text-destructive text-sm p-2 bg-destructive/5 border border-destructive/20 rounded',
});

export type Ref = any;

interface Option {
	label: string;
	value: string;
}

const ReactSelectAsync = forwardRef<Ref, AsyncProps<Option, any, any> & { extraControlClassName?: string }>(
	(
		{
			options,
			placeholder,
			isMulti = false,
			isClearable = true,
			isSearchable = true,
			isDisabled = false,
			extraControlClassName,
			...props
		},
		ref
	) => {
		return (
			<AsyncSelect
				ref={ref}
				unstyled
				classNamePrefix={'react-select-'}
				classNames={classNames(extraControlClassName) as any}
				styles={selectStyles as any}
				components={{
					ClearIndicator: (props) => (
						<components.ClearIndicator className='border-r-input mr-1 border-r pr-1' {...props}>
							<X className='text-destructive size-5 font-medium' />
						</components.ClearIndicator>
					),

					MultiValueRemove: (props) => (
						<components.MultiValueRemove {...props}>
							<X className='text-destructive ml-1 size-4 font-medium' />
						</components.MultiValueRemove>
					),

					DropdownIndicator: (props) => (
						<components.DropdownIndicator {...props}>
							<ChevronDown
								className={cn(
									'text-secondary/50 size-5 transform transition-transform duration-300',
									props.selectProps.menuIsOpen && 'rotate-90'
								)}
							/>
						</components.DropdownIndicator>
					),
				}}
				isMulti={isMulti}
				isDisabled={isDisabled}
				isClearable={isClearable}
				isSearchable={isSearchable}
				options={options}
				placeholder={placeholder}
				{...props}
			/>
		);
	}
);

export default ReactSelectAsync;
