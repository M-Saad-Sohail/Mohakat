import { useCallback } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useLoading } from "./../state/loading/hook";
import { useUser } from "./../state/user/hook";
import { UserType } from "./../state/user/types";
import { UserCredentials, RegisterUserCredentials } from "./../types";
import { setUserAction } from "./../state/user";
import { useRouter } from "next/router"; // Corrected import statement
import { PATHS } from "../contants";

export const useAuth = () => {
  const { isLoading, setIsLoading } = useLoading();
  const { setUser } = useUser();
  const router = useRouter(); // Corrected router import

  const loginUser = useCallback(
    async (credentials: UserCredentials) => {
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          "http://localhost:4000/api/v1/login",
          credentials
        );
        const user: UserType = {
          key: data.token,
          avator: data.sponser.avator, // Corrected key name
          createdAt: data.sponser.createdAt, // Corrected key name
          email: data.sponser.email, // Corrected key name
          name: data.sponser.name, // Corrected key name
          no_of_sponsor: data.sponser.no_of_sponsor, // Corrected key name
          password: data.sponser.password, // Corrected key name
          role: data.sponser.role, // Corrected key name
          status: data.sponser.status, // Corrected key name
          __v: data.sponser.__v, // Corrected key name
          id: data.sponser._id, // Corrected key name
        };
        if (data.success){
          router.push('/dashboard');
        }
        console.log("user", user);

        toast.success("Login Successful.");
        setUser({ user, isAuthenticated: true });
      } catch (e) {
        if (e instanceof AxiosError) toast.error(e.response?.data.message);
        else toast.error("Some error has occurred! Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setUser]
  );

  const registerUser = useCallback(
    async (credentials: RegisterUserCredentials) => {
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          "http://localhost:4000/api/v1/register",
          credentials
        );
        const user: UserType = {
          key: data.token,
          avator: data.sponser.avator, // Corrected key name
          createdAt: data.sponser.createdAt, // Corrected key name
          email: data.sponser.email, // Corrected key name
          name: data.sponser.name, // Corrected key name
          no_of_sponsor: data.sponser.no_of_sponsor, // Corrected key name
          password: data.sponser.password, // Corrected key name
          role: data.sponser.role, // Corrected key name
          status: data.sponser.status, // Corrected key name
          __v: data.sponser.__v, // Corrected key name
          id: data.sponser._id, // Corrected key name
        };
        if (data.success){
          router.push('/verification');
        }
        console.log("user", user);
        
        toast.success("Register Successful.");
        router.push('/verification'); // Corrected redirection
      } catch (e) {
        if (e instanceof AxiosError) toast.error(e.response?.data.message);
        else toast.error("Some error has occurred! Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setUser, router]
  );

  const logoutUser = useCallback(() => {
    toast.success("Logout Successful.");
    setUser({ user: undefined, isAuthenticated: false });
  }, [setUser]);

  return {
    loginUser,
    registerUser, 
    logoutUser,
    isLoading,
  };
};
