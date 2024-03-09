import { BecomeSponsorSchema, LoginSchema } from "../types";
export const PATHS = {
  HOME: "/",
  FORGETPASSWORD: "/forget-password",
  LOGIN: "/sign-in",
  SPONSOR: "/become-sponsor",
  VERIFICATION: "/verification",
};

export const Links = [
  { name: "Support", link: "/support" },
  { name: "Sponsor", link: "/become-sponsor" },
  { name: "Empower", link: "/emPower" },
  { name: "FAQs", link: "faqs" },
  { name: "Contact", link: "/contact" },
];

export const LOGININITIALVALUES: LoginSchema = {
  email: "",
  password: "",
};
export const BECOMESPONSORINITIALVALUES: BecomeSponsorSchema = {
  name: "",
  fatherName: "",
  postalCode: "",
  country: "",
  gender: "Male",
  cnicNumber: "",
  email: "",
  new_password1: "",
  new_password2: "",
  address: "",
};
