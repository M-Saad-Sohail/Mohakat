import React, { useCallback, useState } from 'react';
import { dashboard } from '@/contants';
import InfoCards from '@/components/UI/Card';
import DashboardNavbar from '@/components/UI/Navbar/DashboardNavbar';
import Image from 'next/image';
import { add_icon } from '@/assests';
import Table from '@/components/UI/Table';
import { DASHBOARDCOLUMN, DASHBOARDDATA } from '@/contants';
import { useTranslations } from 'next-intl';
import { Loader } from 'lucide-react';
import { getUserFromLocalStorage } from '@/utils/auth';
import { toast } from 'react-toastify';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import {
	fetchAdminModerators,
	fetchDashboardStats,
} from '@/hooks/useSponsorTables';
type CARD = {
	name: string;
	value: string;
};

const AdminDashboard = () => {
	const { dir, redirect } = useLocaleRouter();
	const t = useTranslations('Dashboard');
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [stats, setStats] = useState<Array<{ name: string, value: string }>>([]);
	const init = useCallback(async () => {
		setIsLoading(true);
		try {
			const user = getUserFromLocalStorage();
			if (!user) {
				redirect('/sign-in');
				return;
			}

			const token = user.key;
			let moderators = await fetchAdminModerators(token);
			let stats = await fetchDashboardStats(token);
			setStats(stats.dashboard);
			moderators = moderators.adminData.map((mod: any) => ({
				id: mod._id,
				email: mod.email,
				name: mod.name,
				role: mod.role,
			}));
			setData(moderators);
			setIsLoading(false);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
			setIsLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		init();
	}, [init]);

	return (
		<div dir={dir} className="w-full">
			<DashboardNavbar title={t('title')} />
			{isLoading ? (
				<div className="w-full h-full my-10">
					<Loader />
				</div>
			) : (
				<>
					<div
						dir={dir}
						className="flex flex-wrap w-full px-4 mx-auto my-4 text-primary gap-x-3"
					>
						{stats.map((item, index) => (
							<InfoCards
								key={index}
								heading={t(`cards.${index + 1}`)}
								value={item.value}
								classname="flex-1 mb-2"
								valueclass="text-[32px] mt-4"
							/>
						))}
					</div>
					<div className="flex w-full px-4 py-4 mobile:pt-4">
						<h2 className="text-black text-[24px] flex items-center w-full my-4 font-bold">
							{t('section1')}
						</h2>
						<div
							className="gap-x-4 flex flex-row w-fit min-w-[160px] text-white bg-primary  cursor-pointer rounded-md  border-main font-bold py-2 px-4  h-[50px] justify-center items-center"
							onClick={() => {
								// setDeleteOpenModal(true);
							}}
						>
							<Image src={add_icon} alt="alt" className="w-4 h-4" />
							<button className="text-[14px] text-white">
								{t('add_user')}
							</button>
						</div>
					</div>
					<div className="px-4">
						<Table data={data} columns={DASHBOARDCOLUMN} />
					</div>
				</>
			)}
		</div>
	);
};

export default AdminDashboard;
