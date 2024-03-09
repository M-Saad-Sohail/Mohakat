import React from "react";
import Input from "./../../../../UI//Input";
import Button from "./../../../../UI/Button";
import Link from "next/link";
import { useFormik } from "formik";
import { PATHS,BECOMESPONSORINITIALVALUES } from "../../../../../contants";
import { becomeSponsorSchema } from "./../../../../../utils/validationSchema";
import { BecomeSponsorSchema } from "../../../../../types";

// type IProps = {
//   submitHandler: (arg: UserCredentials) => void;
//   isLoading: boolean;
// };

const Form = () => {
    const { handleSubmit, handleChange, values, touched, errors } = useFormik({
      initialValues: BECOMESPONSORINITIALVALUES,
      validationSchema: becomeSponsorSchema,
      onSubmit: (values: BecomeSponsorSchema) => {
        console.log('values', values)
        // submitHandler({...values, email: values.email.toLowerCase()});
      },
    });
  return (
    <form
      className="w-full "
      noValidate
        onSubmit={handleSubmit}
    >
      <div className="mx-4">
        <h2 className="text-4xl font-bold text-primary mt-10 leading-normal pt-2">
          Become a Sponsor
        </h2>
        <p className="text-xl font-semibold text-primary  leading-normal pt-2 mb-8">
          Take a step for the betterment of people
        </p>
        <Input
          title="Name"
          placeholder="Enter your name"
          name="name"
          className="mb-[19px]"
          onChange={handleChange}
          value={values.name}
          error={touched.name && errors.name}
        />
          <Input
          title="Father Name"
          placeholder="Enter your fathrt name"
          name="fatherName"
          className="mb-[19px]"
          onChange={handleChange}
          value={values.fatherName}
          error={touched.fatherName && errors.fatherName}
        />
        <Input
          title="Email"
          placeholder="Enter your email"
          type="email"
          name="email"
          className=""
          onChange={handleChange}
          value={values.email}
          error={touched.email && errors.email}
        />
          <Input
          title="Password"
          placeholder="*************"
          name="new_password1"
          onChange={handleChange}
          value={values.new_password1}
          error={touched.new_password1 && errors.new_password1}
        />
          <Input
          title="Password"
          placeholder="*************"
          name="new_password2"
          onChange={handleChange}
          value={values.new_password2}
          error={touched.new_password2 && errors.new_password2}
        />
          <Input
          title="CNIC"
          placeholder="012345678912"
          name="cnicNumber"
          onChange={handleChange}
          value={values.cnicNumber}
          error={touched.cnicNumber && errors.cnicNumber}
        />
          <Input
          title="Postal Code"
          placeholder="74600"
          name="postalCode"
          onChange={handleChange}
          value={values.postalCode}
          error={touched.postalCode && errors.postalCode}
        />
           <Input
          title="Country"
          placeholder="Pakistan"
          name="country"
          onChange={handleChange}
          value={values.country}
          error={touched.country && errors.country}
        />
          <Input
          title="Address"
          placeholder="ABC street"
          name="address"
          onChange={handleChange}
          value={values.address}
          error={touched.address && errors.address}
        />
        <select
            className="text-center text-primary text-lg my-6 justify-center items-center flex font-helvetica"
            onChange={handleChange}
            value={values.gender} // Set the value attribute for select
            name="gender" // Add the name attribute
          >
            <option value={'Male'}>Male</option>
            <option value={'Female'}>Female</option>
          </select>
        <div className=" justify-center items-center flex w-full">
        <Button title='Become a sponsor' className='max-w-[250px] px-6 'type="submit"  />
        </div>
   
        <Link
          href={PATHS.LOGIN}
          className="text-center text-primary text-lg my-6 justify-center items-center flex font-helvetica"
        > Already have an account? <Link className="text-primary font-bold" href={'/sign-in'}>Sign In</Link>
        </Link>
      </div>
    </form>
  );
};

export default Form;