import React from "react";
import Input from "./../../../../UI//Input";
import Button from "./../../../../UI/Button";
import Link from "next/link";
import { useFormik } from "formik";
import { PATHS,LOGININITIALVALUES } from "../../../../../contants";
import { loginSchema } from "./../../../../../utils/validationSchema";
import { UserCredentials } from "./../../../../../types";

type IProps = {
  submitHandler: (arg: UserCredentials) => void;
  isLoading: boolean;
};

const Form = ({ submitHandler, isLoading }: IProps) => {
    const { handleSubmit, handleChange, values, touched, errors } = useFormik({
      initialValues: LOGININITIALVALUES,
      validationSchema: loginSchema,
      onSubmit: (values: UserCredentials) => {
        submitHandler({...values, email: values.email.toLowerCase()});
        console.log('values', values)
      },
    });
  return (
    <form
      className="w-full mt-[200px]"
      noValidate
        onSubmit={handleSubmit}
    >
      <div className="mx-4 my-10">
        <h2 className="text-4xl font-bold text-primary mt-10 leading-normal pt-2">
        Sign In
        </h2>
        <h4 className="text-xl font-semibold text-primary  leading-normal pt-2 mb-8">
        Enter your credentials to continue
        </h4>
        <Input
          title="Email"
          placeholder="Enter your Email"
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
          name="password"
          onChange={handleChange}
          value={values.password}
          error={touched.password && errors.password}
        />
        <div className=" justify-center items-center flex w-full">
        <Button title='Sign In' className='min-w-[250px] px-6 'type="submit" isLoading={isLoading} />
        </div>
   
        <Link
          href={PATHS.LOGIN}
          className="text-center text-primary text-lg my-6 justify-center items-center flex font-helvetica mt-20"
        >
          Don’t have an account?  <Link className="text-primary font-bold" href="/become-sponsors"> Become a Sponsor</Link>
        </Link>
      </div>
    </form>
  );
};

export default Form;