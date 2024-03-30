import LeftSideBar from '@/components/UI/Sidebar';
import { getDirection } from '@/utils/get-direction';
import React from 'react';

const layout = (props: {
	children: React.ReactNode;
	params: { locale: string };
}) => {
	const dir = getDirection(props.params.locale);
	return (
		<div dir={dir}>
			<div className="flex bg-[#f4f4f4ea]">
				<LeftSideBar />
				<div className="w-full px-3 overflow-x-hidden">{props.children}</div>
			</div>
		</div>
	);
};

export default layout;
