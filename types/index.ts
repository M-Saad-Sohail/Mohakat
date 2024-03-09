import {
    loginSchema,
    becomeSponsorSchema
  } from "./../utils/validationSchema";
import { InferType } from "yup";

export type LoginSchema = InferType<typeof loginSchema>;
export type BecomeSponsorSchema= InferType<typeof becomeSponsorSchema>;
export type UserCredentials = {
    password: string;
    email: string;
  };
  