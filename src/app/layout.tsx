import MainProvider from '@/components/Provider/MainProvider';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/logo.svg" sizes="any" />
			</head>
			<body>
				<MainProvider>{children}</MainProvider>
			</body>
		</html>
	);
}
