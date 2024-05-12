import MainProvider from '@/components/common/Provider';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import '@/styles/globals.css';
import { Raleway } from 'next/font/google';
import { Noto_Kufi_Arabic } from 'next/font/google';
const raleway = Raleway({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	display: 'swap',
});
const noto = Noto_Kufi_Arabic({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	style: ['normal'],
	subsets: ['arabic'],
	display: 'swap',
});

export default function RootLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	const messages = useMessages();
	return (
		<html lang={locale}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/logo.svg" sizes="any" />
			</head>
			<body className={locale === 'ar' ? noto.className : raleway.className}>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<MainProvider locale={locale}>{children}</MainProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
