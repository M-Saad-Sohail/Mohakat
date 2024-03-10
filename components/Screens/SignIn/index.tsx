'use client'
import AuthLayout from '../../UI/AuthLayout'
import Form from "./components/Form"
import React from 'react'
import { useEffect } from "react";
import { useAuth } from '../../../hooks/useAuth'
import { navigateToDashboardIfLoggedIn } from "./../../../utils/auth";
import { useRouter } from 'next/router';

const SignIn = () => {
  const router = useRouter();

  useEffect(() => {
    console.log('typeof router', typeof router)
    navigateToDashboardIfLoggedIn(router);

  }, [router]);

  const { loginUser, isLoading } = useAuth();
  return (
    <AuthLayout>
      <Form submitHandler={loginUser} isLoading={isLoading} />
    </AuthLayout>
  );
};

export default SignIn;
