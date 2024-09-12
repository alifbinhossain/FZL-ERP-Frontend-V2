import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input, InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ControllerRenderProps } from 'react-hook-form';

interface FormInputProps extends InputProps {
	field: ControllerRenderProps<any, any>;
	label?: string;
	placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({
	field,
	label,
	placeholder = 'Write here',
	type,
	className,
}) => {
	return (
		<FormItem>
			<FormLabel className='capitalize'>{label || field.name}</FormLabel>
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
