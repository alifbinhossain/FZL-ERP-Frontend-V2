import { useFormContext } from 'react-hook-form';

import CoreForm from '@/components/core/form';
import { IFormSelectOption } from '@/components/core/form/form-select';
import { FormField } from '@/components/ui/form';

import { useOtherVendor } from '@/lib/common-queries/other';

import { IReceive } from '../../_config/schema';

const Header = () => {
	const form = useFormContext<IReceive>();
	const { data: vendor } = useOtherVendor<IFormSelectOption[]>();
	const purchaseOptions: IFormSelectOption[] = [
		{ label: 'Import', value: 0 },
		{ label: 'Local', value: 1 },
	];

	return (
		<CoreForm.Section title='Information' className='md:grid-cols-2'>
			<FormField
				control={form.control}
				name='vendor_uuid'
				render={(props) => (
					<CoreForm.Select
						options={vendor || []}
						label='Vendor'
						placeholder='Select Vendor'
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='is_local'
				render={(props) => (
					<CoreForm.Select
						valueType='number'
						options={purchaseOptions}
						label='Local/Import'
						placeholder='Select one'
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='lc_number'
				render={(props) => (
					<CoreForm.Input label='LC Number' {...props} />
				)}
			/>
			<FormField
				control={form.control}
				name='challan_number'
				render={(props) => <CoreForm.Input {...props} />}
			/>
			<FormField
				control={form.control}
				name='remarks'
				render={(props) => <CoreForm.Textarea {...props} />}
			/>
		</CoreForm.Section>
	);
};

export default Header;
