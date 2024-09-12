import { Table } from '@/components/core/table';
import { Payment, testColumns } from './_const/columns';
import { useTest } from './_const/query';

const fakePayments: Payment[] = Array.from({ length: 10 }, (_, i) => ({
	amount: 100 + i,
	email: `a${i}@a.com`,
	id: `${i + 1}`,
	status: 'success',
}));

const Test = () => {
	const { data, isLoading, deleteData, postData } = useTest<Payment>();

	return <Table columns={testColumns()} data={fakePayments} />;
};

export default Test;
