'use client';
import { usePathname } from 'next/navigation';
import AuthNavbar from './AuthNavbar';
import AppNavbar from './AppNavbar';

const Navbar = () => {
	const pathname = usePathname();
	// Function to check if the current path is an authentication path
	const isAuthPath = (path: string) => {
		let newPath = path.replace('/tr', '');
		newPath = newPath.replace('/ar', '');
		newPath = newPath.replace('/en', '');

		const authPaths = [
			'/',
			'/forget-password',
			'/sign-in',
			'/become-sponsor',
			'/verification',
		];

		if (newPath === '') {
			return true;
		}

		return authPaths.includes(newPath);
	};

	if (!pathname) {
		return <AppNavbar />;
	}

	return isAuthPath(pathname) ? <AuthNavbar /> : null;
};

export default Navbar;
