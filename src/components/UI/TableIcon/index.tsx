import React from 'react';
import { dollar, transaction, name, email, country, language_icon } from '@/assests';
import Image from 'next/image';

type Props = {
    src?: string;
    show: boolean;
};

const TableIcon = ({ src, show }: Props) => {
    const value = [
        {
            name: 'Name',
            src: name
        },
        {
            name: 'Email',
            src: email
        },
        {
            name: 'Country',
            src: country
        },
        {
            name: 'Language',
            src: language_icon
        }
    ];

    let iconSrc = null;

    // Find the matching src from value array
    if (src && show) {
        const matchedValue = value.find(item => item.name === src);
        if (matchedValue) {
            iconSrc = matchedValue.src;
        }
    }

    return (
        <div className='flex gap-x-2'>
            {iconSrc && <Image src={iconSrc} alt="alt" className='w-8 h-8' />}
            <Image src={transaction} alt="alt" className='w-8 h-8' />
            <Image src={dollar} alt="alt" className='w-8 h-8' />
        </div>
    );
};

export default TableIcon;
