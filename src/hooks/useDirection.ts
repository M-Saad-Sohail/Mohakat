import { useParams } from 'next/navigation';

const useDirection = () => {
	const params = useParams() as {
		locale: string;
	};

	if (!params) return 'ltr';

	if (params.locale === 'ar') {
		return 'rtl';
	}

	return 'ltr';
};

export default useDirection;