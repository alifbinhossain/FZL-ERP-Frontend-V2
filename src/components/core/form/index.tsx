import FormAddEditWrapper from './form-add-edit-wrapper';
import FormCheckbox from './form-checkbox';
import FormDynamicFields from './form-dynamic-fields';
import FormInput from './form-input';
import FormJoinInputSelect from './form-join-input-select';
import FormJoinInputUnit from './form-join-input-unit';
import FormMultiSelect from './form-multi-select';
import FormReactSelect from './form-react-select';
import FormSection from './form-section';
import FormSelect from './form-select';
import FormSubmit from './form-submit';
import FormTextarea from './form-textarea';

const Form = {
	Input: FormInput,
	Textarea: FormTextarea,
	Checkbox: FormCheckbox,
	Select: FormSelect,
	MultiSelect: FormMultiSelect,
	ReactSelect: FormReactSelect,
	Submit: FormSubmit,
	Section: FormSection,
	JoinInputUnit: FormJoinInputUnit,
	JoinInputSelect: FormJoinInputSelect,
	DynamicFields: FormDynamicFields,
	AddEditWrapper: FormAddEditWrapper,
};

export default Form;
