import { object, string, ref, number } from "yup";
export const loginSchema = object({
  email: string().required("Username is Required"),
  password: string().required("Password is Required"),
});

export const becomeSponsorSchema=object({
  name: string().required("Name is Required"),
 fatherName: string().required("Father Name is Required"),
  postalCode: string().required("Postal Code is Required"),
  country: string().required("Country is Required"),
  gender:string().required(""),
  cnicNumber: string().required("CNIC Number is Required")
  .matches(/^[0-9]+$/, "Must be only digits")
  .min(12, 'Min 12 digit'),
  email: string().required("Email is Required"),
  password: string().required("Password is required"),
  // new_password2: string()
  //   .oneOf([ref("new_password1")], "Password must match")
  //   .required("Confirm password is required"),
  address: string().required(" Address  is Required"),
});
