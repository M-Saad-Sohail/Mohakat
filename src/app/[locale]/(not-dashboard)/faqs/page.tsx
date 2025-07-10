import MainLayout from '@/components/common/MainLayout';
import Redirect from '@/components/common/Redirect';
import FAQS from '@/components/screens/FAQ/FAQS';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'FAQs',
};

const Page = () => {
	return (
		<MainLayout>
			<FAQS />
		</MainLayout>
	);
};

export default Page;
