import MainProvider from '@/components/Provider/MainProvider';
import { NextIntlClientProvider, useMessages } from 'next-intl';

export default function RootLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	const messages = useMessages()
	return (
		<html lang={locale}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/logo.svg" sizes="any" />
			</head>
			<body>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<MainProvider locale={locale}>{children}</MainProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
