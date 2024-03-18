import { getUserFromLocalStorage } from '@/utils/auth';

type Apihandler = (key: string) => Promise<{
	sponser: any[];
	success: boolean;
}>;

const fetchSponsorData = async (apiHandler: Apihandler) => {
	try {
		const user = getUserFromLocalStorage();
		if (!user) {
      return [];
    };
		const data = await apiHandler(user.key);
		let sponser = data?.sponser || [];
		const languageMap = {
			en: 'English',
			ar: 'Arabic',
			tr: 'Turkish',
		};
		sponser = sponser
			.filter((sponsor: any) => sponsor.name !== 'Super Admin')
			.map((sponsor: any) => {
				return {
					...sponsor,
					language: languageMap[sponsor?.language as keyof typeof languageMap],
				};
			});
		return sponser;
	} catch (error) {
		console.error('Error fetching data:', error);
		return [];
	}
};

export default fetchSponsorData;