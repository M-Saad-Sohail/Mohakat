"use client";
import { useEffect, useState } from "react";
import {
  dashboard,
  sponsor,
  families,
  credit_card,
  logo,
} from "./../../../assests";
import Link from "next/link";
import { useWindowSize } from "./../../../hooks/useWindowSize";
import { toast } from "react-toastify";
import Image from "next/image";
import { getUserFromLocalStorage } from "../../../utils/auth";
// import { isAdminUserLoggedIn } from "./../../../utils/auth";

const LeftSideBar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (user && user.role === "admin") {
      setIsAdmin(true);
    }

  }, []);
  const size = useWindowSize();
  const [open, setOpen] = useState(size.width > 768);
  const [clickedMenu, setClickedMenu] = useState(0);

  const Menu = [
    { title: "Dashboard", src: dashboard, link: "/dashboard" },
    { title: "Families", src: families, link: "#" },
    { title: "Sponsoring", src: sponsor, link: "#" },
    { title: "Credit Cards", src: credit_card, link: "#" },
  ];
  const AdminMenus = [
    { title: "Dashboard", src: dashboard, link: "/dashboard" },
    { title: "Families", src: families, link: "#" },
    { title: "Sponsoring", src: sponsor, link: "#" },
    { title: "Credit Cards", src: credit_card, link: "#" },
    {
      title: "Approved Sponsor",
      src: families,
      link: "/dashboard/sponsor/approved",
    },
    {
      title: "Rejected Sponsor",
      src: families,
      link: "/dashboard/sponsor/rejected",
    },
    {
      title: "Pending Sponsor",
      src: families,
      link: "/dashboard/sponsor/pending",
    },
  ];

  const handleClick = (index: any) => {
    setClickedMenu(index);
  };
  const Menus = isAdmin ? AdminMenus : Menu;
  return (
    <div className="flex h-full">
      <div
        className={`fixed w-[275px] max-h-fit ${
          open ? "w-[240px] max-h-fit" : "w-20 "
        }
           h-screen p-5 pt-8 relative duration-300 bg-white shadow-md`}
      >
        <div className="flex gap-x-2 items-center">
          <Link href="/">
            <img
              src={logo}
              className={`${!open && "hidden"}`}
              width={150}
              height={150}
            />
          </Link>
        </div>
        <ul className="py-6">
          {Menus.map((Menu, index) => (
            <Link
              href={Menu.link}
              key={index}
              {...(Menu.title === "Logout" && {
                onClick: () => {},
              })}
            >
              <li
                className={`flex  rounded-md p-2 mt-4 cursor-pointer hover:bg-light-white text-black text-sm items-center gap-x-4 
                  ${index === 0 && "bg-light-white"}`}
                onClick={() => handleClick(index)} // Add onClick event
              >
                <Image
                  src={Menu.src}
                  className="w-8 h-8 object-contain"
                  alt=""
                  style={
                    clickedMenu === index
                      ? {
                          filter:
                            "invert(26%) sepia(96%) saturate(581%) hue-rotate(317deg) brightness(91%) contrast(83%)",
                        }
                      : {}
                  }
                />

                <p
                  className={`${open && "hidden"} ${
                    clickedMenu === index ? "text-primary" : "text-black"
                  }
                    origin-left font-semibold text-[20px] duration-200`}
                >
                  {Menu.title}
                </p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeftSideBar;
