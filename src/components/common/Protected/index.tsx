'use client'

import { PATHS } from "@/contants";
import useLocaleRouter from "@/hooks/useLocaleRouter";
import { getUserFromLocalStorage } from "@/utils/auth";
import { PropsWithChildren, useState, useEffect } from "react";

const Protected: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
	const { url, dir, redirect } = useLocaleRouter();

	useEffect(() => {
		const user = getUserFromLocalStorage();
		setIsLoggedIn(!!user)
		if (!user) {
			redirect(PATHS.LOGIN)
			return;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!isLoggedIn) {
		return <></>
	}

  return children ?? null
}

export default Protected;