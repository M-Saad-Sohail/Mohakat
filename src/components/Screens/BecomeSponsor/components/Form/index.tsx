import React from "react";
import Input from "./../../../../UI//Input";
import Button from "./../../../../UI/Button";
import Select from "./../../../../UI/Select";
import Link from "next/link";
import { useFormik } from "formik";
import { PATHS, BECOMESPONSORINITIALVALUES } from "../../../../../contants";
import { becomeSponsorSchema } from "./../../../../../utils/validationSchema";
import {
  BecomeSponsorSchema,
  RegisterUserCredentials,
} from "../../../../../types";
import { useIntl } from "react-intl";

type IProps = {
  submitHandler: (arg: RegisterUserCredentials) => void;
  isLoading: boolean;
};

const Form = ({ submitHandler, isLoading }: IProps) => {
  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: BECOMESPONSORINITIALVALUES,
    validationSchema: becomeSponsorSchema,
    onSubmit: (values: RegisterUserCredentials) => {
      console.log("values", values);
      submitHandler({ ...values, email: values.email.toLowerCase() });
    },
  });

  const int = useIntl();
  const getLocaleValue = (id: string) =>
    int.formatMessage({ id: `becomesponsor.form.${id}` });

  return (
    <div className="w-full overflow-scroll overflow-y-auto">
      <form
        className="w-full" // Set form overflow to auto
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="mx-4">
          <h2 className="text-4xl font-bold text-primary mt-10 leading-normal pt-2">
            {getLocaleValue("title")}
          </h2>
          <p className="text-xl font-semibold text-primary  leading-normal pt-2 mb-8">
            {getLocaleValue("description")}
          </p>
          <Input
            title={getLocaleValue("name.title")}
            placeholder={getLocaleValue("name.placeholder")}
            name="name"
            className="mb-[19px]"
            onChange={handleChange}
            value={values.name}
            error={touched.name && errors.name}
          />
          <Input
            title={getLocaleValue("fatherName.title")}
            placeholder={getLocaleValue("fatherName.placeholder")}
            name="fatherName"
            className="mb-[19px]"
            onChange={handleChange}
            value={values.fatherName}
            error={touched.fatherName && errors.fatherName}
          />
          <Input
            title={getLocaleValue("email.title")}
            placeholder={getLocaleValue("email.placeholder")}
            type="email"
            name="email"
            className=""
            onChange={handleChange}
            value={values.email}
            error={touched.email && errors.email}
          />
          <Input
            title={getLocaleValue("password.title")}
            placeholder="*************"
            name="password"
            type="password"
            onChange={handleChange}
            value={values.password}
            error={touched.password && errors.password}
          />
          <Input
            title={getLocaleValue("cnic.title")}
            placeholder="012345678912"
            name="cnicNumber"
            onChange={handleChange}
            value={values.cnicNumber}
            error={touched.cnicNumber && errors.cnicNumber}
          />
          <Input
            title={getLocaleValue("postalCode.title")}
            placeholder="74600"
            name="postalCode"
            onChange={handleChange}
            value={values.postalCode}
            error={touched.postalCode && errors.postalCode}
          />
          <Input
            title={getLocaleValue("country.title")}
            placeholder={getLocaleValue("country.placeholder")}
            name="country"
            onChange={handleChange}
            value={values.country}
            error={touched.country && errors.country}
          />
          <Input
            title={getLocaleValue("address.title")}
            placeholder={getLocaleValue("address.placeholder")}
            name="address"
            onChange={handleChange}
            value={values.address}
            error={touched.address && errors.address}
          />

          <Select
            name="gender"
            title={getLocaleValue("gender.title")}
            options={[
              { label: getLocaleValue("gender.value.0"), value: "Male" },
              { label: getLocaleValue("gender.value.1"), value: "Female" },
            ]}
            onChange={handleChange}
            value={values.gender}
            error={touched.gender && errors.gender}
          />

          <div className=" justify-center items-center flex w-full">
            <Button
              title={getLocaleValue("submit")}
              className="max-w-[250px] px-6 "
              type="submit"
              isLoading={isLoading}
            />
          </div>

          <div className="text-center text-primary text-lg my-6 justify-center items-center flex font-helvetica">
            {" "}
            {getLocaleValue("cta.0")}{" "}
            <Link className="text-primary font-bold" href={"/sign-in"}>
              {getLocaleValue("cta.1")}
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
