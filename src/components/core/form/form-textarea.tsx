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
import { Textarea, TextareaProps } from '@/components/ui/textarea';

import { cn } from '@/lib/utils';

interface FormTextareaProps extends TextareaProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	label?: string;
	placeholder?: string;
	optional?: boolean;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
	field,
	label,
	placeholder = 'Write here',
	optional = false,
	className,
}) => {
	return (
		<FormItem className='space-y-1'>
			<FormLabel className='capitalize'>
				{label || field.name}{' '}
				{optional ? <span className='text-xs'>(Optional)</span> : ''}
			</FormLabel>
			<FormControl>
				<Textarea
					className={cn(className)}
					placeholder={placeholder}
					{...field}
				/>
			</FormControl>
			<FormMessage />
		</FormItem>
	);
};

export default FormTextarea;
