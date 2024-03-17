'use client';

import AuthLayout from './../../UI/AuthLayout';
import React from 'react';
import { verification } from '../../../assests';
import Link from 'next/link';
import Image from 'next/image';
import { useIntl } from 'react-intl';
const ValidationScreen = () => {
	const int = useIntl();
	const getLocaleValue = (id: string) =>
		int.formatMessage({ id: `sponsorsuccess.${id}` });

	return (
		<AuthLayout>
			<div className="mt-[250px] text-primary">
				<Image alt="verification" src={verification} />
				<h1 className="text-[60px] my-2 font-bold">
					{getLocaleValue('message.title')}
				</h1>
				<p className="text-[20px] my-3 max-w-md w-full">
					{getLocaleValue('message.description')}
				</p>
				<div className="flex">
					<Link
						href={'/become-sponsor'}
						className={`py-3 justify-center items-center duration-500 text-center md:flex hidden float-right mr-4 border bg-primary text-white  px-4 rounded-lg font-bold my-4 min-w-[200px]`}
					>
						{getLocaleValue('message.cta')}
					</Link>
				</div>
			</div>
		</AuthLayout>
	);
};

export default ValidationScreen;
