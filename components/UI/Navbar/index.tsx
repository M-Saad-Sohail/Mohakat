import { useRouter } from "next/router";
import AuthNavbar from "./AuthNavbar";
import AppNavbar from "./AppNavbar";

const Navbar = () => {
  const router = useRouter();

  // Function to check if the current path is an authentication path
  const isAuthPath = (path: string) => {

    let newPath = path.replace("/tr", "")
    newPath = newPath.replace("/ar", "")

    const authPaths = [
      "/",
      "/forget-password",
      "/sign-in",
      "/become-sponsor",
      "/verification",
    ];
    return authPaths.includes(newPath);
  };
  console.log("isAuthPath", router.pathname);

  const isAuth = isAuthPath(router.pathname);
  console.log(isAuth)
  return (
    <div>
      {isAuthPath(router.pathname) ? <AuthNavbar isLoggedIn /> : <AppNavbar />}
    </div>
  );
};

export default Navbar;
