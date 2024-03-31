'use client'

import useLocaleRouter from '@/hooks/useLocaleRouter';
import { FC } from 'react';

const Redirect: FC<{ href: string }> = ({ href }) => {
  const { redirect  } = useLocaleRouter()

  redirect(href)

  return <></>
}

export default Redirect;