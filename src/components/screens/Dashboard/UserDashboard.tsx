'use client';
import React, { useEffect, useState } from 'react';
import { UserType } from '@/state/user/types';
import { getUserFromLocalStorage } from '@/utils/auth';
import SocailSharing from './SocailSharing/SocailSharing';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { PATHS } from '@/contants';
import DashboardNavbar from '@/components/ui/Navbar/DashboardNavbar';
import { useTranslations } from 'next-intl';
import SponsoringFamilies from "../SponsoringFamilies"

const UserDashboard = () => {
	const [user, setUser] = useState<UserType | null>(null);
	const router = useLocaleRouter();
    const t = useTranslations('Socail');

	function redirectToHomePage() {
		router.replace('/'); // Change the URL to your landing page URL
	}

	useEffect(() => {
		const loggedInUser = getUserFromLocalStorage();
		if (!loggedInUser) {
			router.redirect(PATHS.LOGIN);
			return;
		}
		setUser(loggedInUser);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!user) return <></>;
	
	return (
		<div className="relative">
		  <div className="mb-6">
			<DashboardNavbar title={t('dashboard')} />
		  </div>
		  {user?.role === "user" && (
      <div className="text-start ml-10 w-full md:w-1/2 feature-shadow-social social-sharing">
        <h1 className="pt-2 mt-10 text-4xl font-bold leading-normal text-[#36454F] social-sharing-h1">
          {t("welcome")} {user.name}
        </h1>
        <h6 className="social-sharing-para">
          {t("title")}
        </h6>
        <SocailSharing />
      </div>

    )}

	{
		user?.role === 'user' && (
			<div className = "mt-10 mb-10"> 
			<div className = "text-center text-[24px] mb-4 text-[#36454F] font-bold"> 
			{t("thankyou")}
				<h1 className = "text-red"> فِلَـٓسَـٓــِٰٓطٓـيَنَُ</h1>
			</div>
			<SponsoringFamilies />
			</div>
		)
	}
		</div>


)};

export default UserDashboard;