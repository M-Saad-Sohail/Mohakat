'use client';
import React from 'react';
import { verification } from '@/assests';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import AuthLayout from '@/components/ui/AuthLayout';
import MainLayout from '@/components/common/MainLayout';
import Button from '@/components/ui/LandingPage/Button';

const Congratulations = () => {
	const { url } = useLocaleRouter();
	const t = useTranslations('SponsorSuccess.message');

	return (
		<MainLayout>
			<AuthLayout>
			<div className="mt-[130px] text-primary bounce-animation mb-[10px]">
      <Image alt="verification" src={verification} className="spin-animation" />
      <h1 className="text-[60px] my-2 font-bold">{t('title')}</h1>
      <p className="text-[20px] my-3 max-w-md w-full">{t('description')}</p>
      <div className="flex flex-center ">
        {/* <Link
          href={url('/')}
          className={`py-3 justify-center items-center duration-500 text-center md:flex hidden float-right mr-4 border bg-primary text-white px-4 rounded-lg font-bold my-4 min-w-[200px]`}
        >
          {t('cta')}
        </Link> */}
        <Link
          href={url('/')}
        >
         <Button
									title={t('cta')}
									Color="#CF7475"
						className = "py-3 justify-center items-center button-animated"	
								/>
        </Link>
		
      </div>
    </div>
			</AuthLayout>
		</MainLayout>
	);
};

export default Congratulations;
