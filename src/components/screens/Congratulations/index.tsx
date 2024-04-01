'use client';
import React from 'react';
import { verification } from '@/assests';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import AuthLayout from '@/components/ui/AuthLayout';
import NotDashboardLayout from '@/components/common/NotDashboardLayout';

const Congratulations = () => {
	const { url } = useLocaleRouter();
	const t = useTranslations('SponsorSuccess.message');

	return (
		<NotDashboardLayout>
			<AuthLayout>
				<div className="mt-[250px] text-primary">
					<Image alt="verification" src={verification} />
					<h1 className="text-[60px] my-2 font-bold">{t('title')}</h1>
					<p className="text-[20px] my-3 max-w-md w-full">{t('description')}</p>
					<div className="flex">
						<Link
							href={url('/become-sponsor')}
							className={`py-3 justify-center items-center duration-500 text-center md:flex hidden float-right mr-4 border bg-primary text-white  px-4 rounded-lg font-bold my-4 min-w-[200px]`}
						>
							{t('cta')}
						</Link>
					</div>
				</div>
			</AuthLayout>
		</NotDashboardLayout>
	);
};

export default Congratulations;
