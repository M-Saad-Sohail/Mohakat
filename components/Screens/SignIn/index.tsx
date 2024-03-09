import AuthLayout from '../../UI/AuthLayout'
import Form from "./components/Form"
import React from 'react'
import { useAuth } from '../../../hooks/useAuth'

const SignIn = () => {
  const { loginUser, isLoading } = useAuth();
  return (
   <AuthLayout>
   <Form submitHandler={loginUser} isLoading={isLoading} />
   </AuthLayout>
  )
}

export default SignIn