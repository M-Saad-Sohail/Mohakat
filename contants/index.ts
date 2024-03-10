import { BecomeSponsorSchema, LoginSchema } from "../types";
import { Column } from "react-table";
export const PATHS = {
  HOME: "/",
  FORGETPASSWORD: "/forget-password",
  LOGIN: "/sign-in",
  SPONSOR: "/become-sponsor",
  VERIFICATION: "/verification",
};

export const Links = [
  { localeId: "links.0", name: "Support", link: "/support" },
  { localeId: "links.1", name: "Sponsor", link: "/become-sponsor" },
  {
    localeId: "links.2", name: "Empower", link: "/emPower"
  },
  {
    localeId: "links.3", name: "FAQs", link: "faqs"
  },
  {
    localeId: "links.4", name: "Contact", link: "/contact"
  },
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
  password: "",
  address: "",
};
export const AUTHPATHS = {
  HOME: "/",
  FORGETPASSWORD: "/forget-password",
  LOGIN: "/sign-in",
  SPONSOR: "/become-sponsor",
  VERIFICATION: "/verification",
};
export const APPROVEDCOLUMN: any = [
  { Header: "Name", accessor: "name" },
  { Header: "Email", accessor: "email" },
  { Header: "Country", accessor: "country"  },
  { Header: "Postal Code", accessor: "postalCode" },
];

export const REJECTEDCOLUMN: any = [
  { Header: "Name", accessor: "name" },
  { Header: "Email", accessor: "email" },
  { Header: "Country", accessor: "country"  },
];
export const PENDINGCOLUMN: any = [
  { Header: "Name", accessor: "name" },
  { Header: "Email", accessor: "email" },
  { Header: "Country", accessor: "country"  },
  { Header : "Action", accessor: "action"}
];

export const SPONSORDATA:any=[
  {
    id:"1234567890",
    name:"testuser12",
    email:"testuser@gmail.com",
    country:"Saudia Arabia",
    postalCode:123456
  },
  {
    id:"2345678901",
    name:"testuser123",
    email:"testuser1@gmail.com",
    country:"Saudia Arabia",
    postalCode:123456
  },
  {
    id:"3456789012",
    name:"testuser",
    email:"testuser123@gmail.com",
    country:"Saudia Arabia",
    postalCode:123456
  },
  {
    id:"1234567890",
    name:"testuser12",
    email:"testuser@gmail.com",
    country:"Saudia Arabia",
    postalCode:123456
  },
  {
    id:"1234567890",
    name:"testuser12",
    email:"testuser@gmail.com",
    country:"Saudia Arabia",
    postalCode:123456
  },
  {
    id:"1234567890",
    name:"testuser12",
    email:"testuser@gmail.com",
    country:"Saudia Arabia",
    postalCode:123456
  },
]