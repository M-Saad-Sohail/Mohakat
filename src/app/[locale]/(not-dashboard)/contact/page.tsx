import MainLayout from '@/components/common/MainLayout';
import Redirect from '@/components/common/Redirect';
import ContactUs from '@/components/screens/ContactUs/ContactUs';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Contact Us',
};

const Page = () => {
	return (
		<MainLayout>
			<ContactUs />
		</MainLayout>
	);
};

export default Page;
