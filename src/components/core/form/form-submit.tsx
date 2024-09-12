import { Button } from '@/components/ui/button';
import { useFormContext } from 'react-hook-form';

const FormSubmit = () => {
	const {
		formState: { isSubmitting, isDirty },
	} = useFormContext();
	return (
		<Button disabled={!isDirty || isSubmitting} type='submit'>
			{isSubmitting ? 'Submitting' : 'Submit'}
		</Button>
	);
};

export default FormSubmit;
