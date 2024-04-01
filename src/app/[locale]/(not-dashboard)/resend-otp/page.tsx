import { ResendOtp } from '@/components/screens';

import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Resend Verification Code`
}

const Page = () => <ResendOtp />;

export default Page;
