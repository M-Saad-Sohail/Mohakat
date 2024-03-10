import { useRouter } from "next/router";
import AuthNavbar from "./AuthNavbar";
import AppNavbar from "./AppNavbar";

const Navbar = () => {
  const router = useRouter();

  // Function to check if the current path is an authentication path
  const isAuthPath = (path: string) => {
    const authPaths = [
      "/",
      "/forget-password",
      "/sign-in",
      "/become-sponsor",
      "/verification",
    ];
    return authPaths.some(authPart => path.includes(authPart));
  };
  console.log("isAuthPath", router.pathname);
  return (
    <div>
      {isAuthPath(router.pathname) ? <AuthNavbar isLoggedIn /> : <AppNavbar />}
    </div>
  );
};

export default Navbar;
