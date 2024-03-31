import React from 'react';
import SignIn from '@/components/screens/Signin';

import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Sign in`
}


const page = () => <SignIn />;

export default page;
