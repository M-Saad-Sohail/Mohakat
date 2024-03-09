import AuthLayout from './../../UI/AuthLayout'
import Form from "./components/Form"
import React from 'react'
import { useAuth } from '../../../hooks/useAuth'

const BecomeSponsor = () => {
  const { registerUser, isLoading } = useAuth();
  return (
   <AuthLayout>
    <Form submitHandler={registerUser} isLoading={isLoading} />
   </AuthLayout>
  )
}

export default BecomeSponsor