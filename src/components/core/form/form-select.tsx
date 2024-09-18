import {
	ControllerFieldState,
	ControllerRenderProps,
	UseFormStateReturn,
} from 'react-hook-form';

import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export interface IFormSelectOption {
	label: string;
	value: string;
}

interface FormSelectProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	label?: string;
	placeholder?: string;
	optional?: boolean;
	options: IFormSelectOption[];
}

const FormSelect: React.FC<FormSelectProps> = ({
	field,
	label,
	placeholder = 'Select an option',
	optional = false,
	options,
}) => {
	return (
		<FormItem className='space-y-1'>
			<FormLabel className='capitalize'>
				{label || field.name.split('_').join(' ')}{' '}
				{optional ? <span className='text-xs'>(Optional)</span> : ''}
			</FormLabel>
			<FormControl>
				<Select
					onValueChange={field.onChange}
					defaultValue={field.value}>
					<FormControl>
						<SelectTrigger>
							<SelectValue placeholder={placeholder} />
						</SelectTrigger>
					</FormControl>
					<SelectContent>
						{options.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</FormControl>
			<FormMessage />
		</FormItem>
	);
};

export default FormSelect;
