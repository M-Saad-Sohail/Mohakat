import axios from 'axios';
import { redirect } from 'next/navigation';
import { getUserInfoFromLocalStorage } from '@/lib/cache';

// Function to handle logout
const logout = () => {
    console.log('Logging out...');
    localStorage.removeItem('user')
    redirect('/sign-in')

};

// Create Axios instance
export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REACT_APP_BASE_URL,
  });
  api.interceptors.request.use(
    async (config) => {
      const user = getUserInfoFromLocalStorage();
      if (user) {
        config.headers.Authorization =  `{user.key}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );
  
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      // If the error status is 401, call the logout function
      logout();
    }
    return Promise.reject(error);
  }
);

export default api
