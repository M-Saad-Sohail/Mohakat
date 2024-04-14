import MainLayout from '@/components/common/MainLayout';
import About from '@/components/screens/About/About';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'About Us',
};

const Page = () => {
	return (
		<MainLayout>
			<About />
		</MainLayout>
	);
};

export default Page;
