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
import { PasswordInput } from '@/components/ui/password-input';

import { cn } from '@/lib/utils';

interface FormInputProps extends InputProps {
	field: ControllerRenderProps<any, any>;
	fieldState: ControllerFieldState;
	formState: UseFormStateReturn<any>;
	label?: string;
	subLabel?: string;
	placeholder?: string;
	optional?: boolean;
	icon?: React.ReactNode;
	disableLabel?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
	field,
	label,
	subLabel,
	placeholder = 'Write here',
	optional = false,
	type,
	className,
	icon,
	disabled = false,
	disableLabel,
}) => {
	return (
		<FormItem className='space-y-1.5'>
			{!disableLabel && (
				<FormLabel className='flex items-center justify-between capitalize'>
					<span>
						{label || field.name.replace('_', ' ')}{' '}
						{optional ? (
							<span className='text-xs'>(Optional)</span>
						) : (
							''
						)}
					</span>
					{subLabel && <span className='text-xs'>{subLabel}</span>}
				</FormLabel>
			)}

			<FormControl>
				{type === 'password' ? (
					<PasswordInput
						className={cn(className)}
						placeholder={placeholder}
						icon={icon}
						disabled={disabled}
						{...field}
					/>
				) : type === 'number' ? (
					<Input
						className={cn(className)}
						placeholder={placeholder}
						icon={icon}
						{...field}
						onBlur={(e) => {
							field.onChange(+e.target.value);
						}}
					/>
				) : (
					<Input
						className={cn(className)}
						placeholder={placeholder}
						type={type}
						icon={icon}
						disabled={disabled}
						{...field}
					/>
				)}
			</FormControl>
			<FormMessage />
		</FormItem>
	);
};

export default FormInput;
