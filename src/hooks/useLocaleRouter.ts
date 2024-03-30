import { getDirection } from '@/utils/get-direction';
import { useParams, useRouter, redirect, usePathname } from 'next/navigation';

const useLocaleRouter = () => {
	let params = useParams() as {
		locale: string;
	};

	let pathname = usePathname();

	if (!pathname) {
		pathname = '';
	}

	const router = useRouter();

	if (!params) {
		params = {
			locale: 'en',
		};
	}

	const url = (path: string) => {
		return `/${params.locale}${path}`;
	};

	const push = (path: string) => {
		router.push(url(path));
	};

	const replace = (path: string) => {
		router.replace(url(path));
	};

	const changeLocale = (locale: string) => {
		const newPath = (pathname ?? '').replace(`/${params.locale}`, `/${locale}`);
		router.replace(newPath);
	}

	const redirectWithLocale = (locale: string, path: string) => {
		router.replace(`/${locale}${path}`);
	}

	const localeRedirect = (path: string) => {
		redirect(url(path));
	};

	return {
		...router,
		push,
		replace,
		redirect: localeRedirect,
		url,
		locale: params.locale,
		dir: getDirection(params.locale),
		changeLocale,
		redirectWithLocale
	};
};

export default useLocaleRouter;
