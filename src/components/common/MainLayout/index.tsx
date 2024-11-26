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
import MetaTags from './MetaTags';

type MainLayoutProps = {
	children: React.ReactNode;
	fromGazaMap?: boolean;
};

const MainLayout = ({ children, fromGazaMap }: MainLayoutProps) => {
	const { user, isLoading } = useLoggedInUser();
	const { redirectWithLocale } = useLocaleRouter();
	const [isCartOpen, setIsCartOpen] = useState(false);

	

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
			{/* <MetaTags/> */}

			<meta name="google-site-verification" content="4Q99eZQB_bVUSsKxHy06hc-_vsAbJAsgWgQfD4b9Cxk" />
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
