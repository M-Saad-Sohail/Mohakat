import { language } from "@/assests";
import { getUserFromLocalStorage } from "@/utils/auth";
import { useCallback, useEffect, useState } from 'react';


type Apihandler = (key: string) => Promise<{
    familySponser: any[];
    success: boolean;
}>;

const useFetchFamilyData = (apiHandler: Apihandler) => {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchFamiliesData = useCallback(async () => {
        setIsLoading(true);
        try {
            const user = getUserFromLocalStorage();
            if (!user) {
                return [];
            }
            const data = await apiHandler(user.key);

            let family = data?.familySponser || [];
            const languageMap = {
                en: 'English',
                ar: 'Arabic',
                tr: 'Turkish',
            };
            family = family.filter((family: any) => family.name !== 'Super Admin').map((family: any) => {
                return {
                    ...family,
                    language: languageMap[family?.language as keyof typeof languageMap],
                };
            });
            return family;
        } catch (error) {
            return [];
        } finally {
            setIsLoading(false);
        }
    }, [apiHandler]);

    const refetch = useCallback(async () => {
        const user = getUserFromLocalStorage();
        if (!user) return;

        const result = await fetchFamiliesData();
        setData(result);
    }, [fetchFamiliesData]);

    useEffect(() => {
        refetch();
    }, [refetch]);
    const init = useCallback(async () => {
        const result = await fetchFamiliesData();
        setData(result);
    }, [fetchFamiliesData]);

    useEffect(() => {
        init();
    }, [init]);

    return { data, isLoading, refetch }
};

export default useFetchFamilyData;