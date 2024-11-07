import { useFormContext } from 'react-hook-form';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { IFormSelectOption } from '@core/form/types';

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
		<CoreForm.Section title='Information' className='lg:grid-cols-4'>
			<FormField
				control={form.control}
				name='vendor_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
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
					<CoreForm.ReactSelect
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
				render={(props) => <CoreForm.Input label='LC Number' {...props} />}
			/>
			<FormField control={form.control} name='challan_number' render={(props) => <CoreForm.Input {...props} />} />
			<div className='col-span-1 sm:col-span-2 lg:col-span-4'>
				<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
			</div>
		</CoreForm.Section>
	);
};

export default Header;
