import { CheckboxProps } from '@radix-ui/react-checkbox';
import {
	ControllerFieldState,
	ControllerRenderProps,
	UseFormStateReturn,
} from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

import { cn } from '@/lib/utils';

interface FormCheckboxProps extends CheckboxProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	label?: string;
	placeholder?: string;
	optional?: boolean;
	icon?: React.ReactNode;
	disableLabel?: boolean;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({
	field,
	label,
	optional = false,
	className,
	disabled = false,
	disableLabel,
}) => {
	return (
		<FormItem className='flex items-center gap-1 space-y-0'>
			<FormControl className=''>
				<Checkbox
					className={cn('size-4', className)}
					disabled={disabled}
					checked={field.value}
					onCheckedChange={field.onChange}
				/>
			</FormControl>

			{!disableLabel && (
				<FormLabel className='m-0 cursor-pointer p-0 capitalize'>
					{label || field.name.replace('_', ' ')}{' '}
					{optional ? (
						<span className='text-xs'>(Optional)</span>
					) : (
						''
					)}
				</FormLabel>
			)}

			<FormMessage />
		</FormItem>
	);
};

export default FormCheckbox;
