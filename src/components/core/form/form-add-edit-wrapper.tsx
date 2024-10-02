import React, { useEffect } from 'react';
import { DevTool } from '@hookform/devtools';
import { UseFormReturn } from 'react-hook-form';

import CoreForm from '@/components/core/form';
import { Form } from '@/components/ui/form';

interface IFormAddEditWrapperProps {
	children: React.ReactNode;
	form: UseFormReturn<any, any, undefined>;
	onSubmit(values: any): void;
	title?: string;
}

const FormAddEditWrapper: React.FC<IFormAddEditWrapperProps> = ({
	children,
	form,
	onSubmit,
	title,
}) => {
	useEffect(() => {
		if (title) {
			document.title = title;
		}
	}, [title]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
				{children}
				<CoreForm.Submit className='w-full' title='Save' />
				<DevTool control={form.control} placement='top-left' />
			</form>
		</Form>
	);
};

export default FormAddEditWrapper;
