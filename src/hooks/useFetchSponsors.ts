import { getUserFromLocalStorage } from '@/utils/auth';
import { useCallback, useEffect, useState } from 'react';

type Apihandler = (key: string) => Promise<{
  sponser: any[];
  success: boolean;
}>;



const useFetchSponsors = (apiHandler: Apihandler) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSponsorData = useCallback(async () => {
    setIsLoading(true);
    try {
      const user = getUserFromLocalStorage();
      if (!user) {
        return [];
      }
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
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [apiHandler]);

  const init = useCallback(async () => {
    const result = await fetchSponsorData();
    setData(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchSponsorData]);

  useEffect(() => {
    init();
  }, [init]);

  return { data, setData, isLoading }
};

export default useFetchSponsors;