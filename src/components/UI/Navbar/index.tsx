'use client';
import { useRouter, usePathname } from 'next/navigation';
import AuthNavbar from './AuthNavbar';
import AppNavbar from './AppNavbar';

const Navbar = () => {
	const pathname = usePathname();
	// Function to check if the current path is an authentication path
	const isAuthPath = (path: string) => {
		let newPath = path.replace('/tr', '');
		newPath = newPath.replace('/ar', '');

		const authPaths = [
			'/',
			'/forget-password',
			'/sign-in',
			'/become-sponsor',
			'/verification',
		];
		return authPaths.includes(newPath);
	};

	return (
		<div>
			{isAuthPath(pathname) ? <AuthNavbar isLoggedIn /> : <AppNavbar />}
		</div>
	);
};

export default Navbar;
