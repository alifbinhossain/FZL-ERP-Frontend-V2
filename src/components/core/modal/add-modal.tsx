import { DevTool } from '@hookform/devtools';
import { UseFormReturn } from 'react-hook-form';

import { FormSubmit } from '@/components/core/form';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';

import { cn } from '@/lib/utils';

interface IAddModalProps {
	form: UseFormReturn<any, any, undefined>;
	onSubmit(values: any): void;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	title?: string;
	subtitle?: string;
	children?: React.ReactNode;
	className?: string;
	isSmall?: boolean;
}

const AddModal: React.FC<IAddModalProps> = ({
	form,
	onSubmit,
	open,
	setOpen,
	title,
	subtitle,
	children,
	className,
	isSmall,
}) => {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent
				className={cn('w-full', isSmall && 'sm:max-w-5xl', className)}>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{subtitle && (
						<DialogDescription>{subtitle}</DialogDescription>
					)}
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='space-y-3'>{children}</div>
						<DialogFooter className='mt-6'>
							<FormSubmit className='w-full' title='Save' />
						</DialogFooter>
						{/* <DevTool control={form.control} placement='top-left' /> */}
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default AddModal;
