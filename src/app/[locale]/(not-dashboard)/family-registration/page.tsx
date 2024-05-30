import React from 'react';
import FamilyRegistration from '@/components/screens/FamilyRegistration';


import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Register a family in gaza`
}

const Page = () => <FamilyRegistration />;

export default Page;