'use client';

import BottomToTop from '@/components/ui/BottomToTop/BottomToTop';
import Cart from '@/components/ui/Cart';
import Footer from '@/components/ui/Footer';
import { Navbar } from '@/components/ui/Navbar';
import MobileNavbar from '@/components/ui/Navbar/MobileNavbar';
import StickeyBar from '@/components/ui/StickeyBar';
import { PATHS } from '@/contants';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import React, { useEffect, useState } from 'react';
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics"
import FacebookPixel from "@/components/analytics/FacebookPixel"

type MainLayoutProps = {
	children: React.ReactNode;
	fromGazaMap?: boolean;
};

const MainLayout = ({ children, fromGazaMap }: MainLayoutProps) => {
	const { user, isLoading } = useLoggedInUser();
	const { redirectWithLocale } = useLocaleRouter();
	const [isCartOpen, setIsCartOpen] = useState(false);

	// useEffect(() => {
	// 	if (!!user) {
	// 		let locale = 'en';
	// 		if (['en', 'ar', 'tr'].includes(user.language)) {
	// 			locale = user.language;
	// 		}
	// 		redirectWithLocale(locale, PATHS.HOME);
	// 	}
	// }, [user]);

	if (fromGazaMap) {
		return (
			<div>
				<BottomToTop />
				<Navbar setIsCartOpen={setIsCartOpen} />
				<MobileNavbar setIsCartOpen={setIsCartOpen} />
				{children}
				<Footer />
			</div>
		);
	}

	if (isLoading) {
		return null;
	}

	return (
		<html>
			<GoogleAnalytics />
			<FacebookPixel />
			<div className=" relative">
				<Navbar setIsCartOpen={setIsCartOpen} />
				<MobileNavbar setIsCartOpen={setIsCartOpen} />
				{!user && <StickeyBar />}
				<Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
				{children}
				<Footer />
				<BottomToTop />
			</div>
		</html>
	);
};

export default MainLayout;
