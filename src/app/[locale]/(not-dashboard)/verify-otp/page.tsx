import { VerifyOtp } from '@/components/screens';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: ` Verification Code`
}

const Page = () => <VerifyOtp />;

export default Page;
