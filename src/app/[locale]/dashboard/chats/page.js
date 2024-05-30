import React from 'react';
import DashboardNavbar from '@/components/ui/Navbar/DashboardNavbar';
import { useTranslations } from 'next-intl';
// import { Metadata } from 'next';
import Chat from '@/components/screens/Dashboard/Chat';

// export const metadata: Metadata = {
// 	title: `Chat`,
// };

const ChatSystem = () => {
	const t = useTranslations('AddFamilies');

	return (
		<>
			<DashboardNavbar title={t('chat')} />
			<Chat />
		</>
	);
};

export default ChatSystem;
