import React, { useEffect, useState } from "react";
import { UserSliceType, UserType } from "../../../../../state/user/types";
import { useSelector } from "react-redux";
import { getUserFromLocalStorage } from "../../../../../utils/auth";
import { useRouter } from "next/router";

const UserDashboard = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();
  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (!user) {
      router.push("/sign-in");
    }
  }, []);

  if (!user) return <></>;

  return <h1 className="text-4xl font-bold text-primary mt-10 leading-normal pt-2">Welcome {user.name}</h1>;
};

export default UserDashboard;
