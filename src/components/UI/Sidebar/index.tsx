'use client';
import { useEffect, useState } from 'react';
import {
	dashboard,
	sponsor,
	families,
	credit_card,
	logo,
	approved__icon,
	pending_icon,
	deny_icon,
	profile,
	dashboard_logo,
	setting_icon,
	form_icon,
	logout
} from './../../../assests';
import Link from 'next/link';
import { useWindowSize } from './../../../hooks/useWindowSize';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { getUserFromLocalStorage } from '@/utils/auth';
import { useAuth } from '@/hooks/useAuth';
// import { isAdminUserLoggedIn } from "./../../../utils/auth";
type IProps = {
	title: string;
	src: any;
	link: string;
	gap?: boolean;
}[];
const LeftSideBar = () => {
	let [user, setUser] = useState<{ name: string; email: string } | null>(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const {logoutUser}=useAuth()
	useEffect(() => {
		const user = getUserFromLocalStorage();
		if (user && user.role === 'admin') {
			setIsAdmin(true);
			setUser(user);
		}
	}, []);
	const size = useWindowSize();
	const [open, setOpen] = useState(size.width > 768);
	const [clickedMenu, setClickedMenu] = useState(0);

	const Menu: IProps = [
		{ title: 'Dashboard', src: dashboard, link: '/dashboard', gap: true },
		{ title: 'Families', src: families, link: '#' },
		{ title: 'Sponsoring', src: sponsor, link: '#' },
		{ title: 'Credit Cards', src: credit_card, link: '#', gap: true },
		{ title: 'Setting ', src: setting_icon, link: '/dashboard/setting' },
	];
	const AdminMenus = [
		{ title: 'Dashboard', src: dashboard, link: '/dashboard',gap: true },
		{ title: 'Families', src: families, link: '#' },
		{
			title: 'Pending Sponsor',
			src: pending_icon,
			link: '/dashboard/sponsor/pending',
		},
		{
			title: 'Approved Sponsor',
			src: approved__icon,
			link: '/dashboard/sponsor/approved',
		},
		{
			title: 'Rejected Sponsor',
			src: deny_icon,
			link: '/dashboard/sponsor/rejected',
			gap: true,
		},
		{ title: 'Form Response', src: form_icon, link: '/dashboard' },
		{ title: 'Setting ', src: setting_icon, link: '/dashboard/setting' },
		{ title: 'Logout', src: logout, link: '/sign-in' },
	];

	const handleClick = (index: any) => {
		setClickedMenu(index);
	};
	const Menus = isAdmin ? AdminMenus : Menu;
	return (
		<div className="flex h-full">
			<div
				className={`fixed w-[275px] max-h-fit ${
					open ? 'w-[240px] max-h-fit' : 'w-20 '
				} h-screen p-5 pt-8 relative duration-300 bg-white shadow-md`}
			>
				<div className="flex gap-x-2 items-center">
					<Link href="/">
						<Image
							src={dashboard_logo}
							alt="Logo"
							className={`${!open && 'hidden'}`}
							width={150}
							height={150}
						/>
					</Link>
				</div>
				<Link href="/" className="">
					<Image src={dashboard_logo} alt="Logo" width={150} height={150} />
				</Link>
				<div className="flex-col flex mx-auto items-center justify-center mt-[40px]">
					<Image
						src={profile} // Replace with the path to the user profile image
						alt={''}
						className="h-[100px] w-[100px] rounded-full mr-2"
					/>
					<p className="font-bold text-[20px]">{user ? user.name : ''}</p>
					<p className="">{user ? user.email : ''}</p>
				</div>
				<ul className="py-6">
					{Menus.map((Menu, index) => (
						<Link
							href={Menu.link}
							key={index}
							onClick={()=>Menu.title === 'Logout'&&logoutUser()}
				
						>
							<li
								className={`flex  rounded-md px-2 py-1 cursor-pointer hover:bg-light-white text-black text-sm items-center gap-x-4 
    ${index === 0 && 'bg-light-white '}`}
								onClick={() => handleClick(index)}

							><div className='flex-col'>
								<div className='flex gap-x-4'>
								<Image
									src={Menu.src}
									className="w-8 h-8 object-contain"
									alt=""
									style={
										clickedMenu === index
											? {
													filter:
														'invert(26%) sepia(96%) saturate(581%) hue-rotate(317deg) brightness(91%) contrast(83%)',
												}
											: {}
									}
								/>
	
									<p
										className={`${open && 'hidden'} ${
											clickedMenu === index ? 'text-primary' : 'text-black'
										}
            origin-left font-semibold text-[20px] duration-200 mt-1`}
									>
										{Menu.title}
									</p>
									</div>
							<div className='mt-4'>

									{Menu.gap && (
								     <div className="w-[200px] h-[1px] bg-black my-5"></div>
									)}{' '}
								
							</div>
							</div>
							</li>
						</Link>
					))}
				</ul>
			</div>
		</div>
	);
};

export default LeftSideBar;
