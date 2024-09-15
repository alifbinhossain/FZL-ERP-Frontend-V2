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
import { Input, InputProps } from '@/components/ui/input';

import { cn } from '@/lib/utils';

interface FormInputProps extends InputProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	label?: string;
	placeholder?: string;
	optional?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
	field,
	label,
	placeholder = 'Write here',
	optional = false,
	type,
	className,
}) => {
	return (
		<FormItem className='space-y-0.5'>
			<FormLabel className='capitalize'>
				{label || field.name.replace('_', ' ')}{' '}
				{optional ? <span className='text-xs'>(Optional)</span> : ''}
			</FormLabel>
			<FormControl>
				<Input
					className={cn(className)}
					placeholder={placeholder}
					type={type}
					{...field}
				/>
			</FormControl>
			<FormMessage />
		</FormItem>
	);
};

export default FormInput;
