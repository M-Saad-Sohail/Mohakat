'use client';
import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { DonateModalType } from '@/types';
import Button from '../LandingPage/Button';
import Image from 'next/image';
import Select from '@/components/ui/Select';
import { countriesData } from '@/contants/countries';
import { useFormik } from 'formik';
// ICONS
import { IoClose } from 'react-icons/io5';
import Input from '@/components/ui//Input';
import ModalInput from '../Input/ModalInput';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import { useSelector } from 'react-redux';
import { monthsData } from '@/contants/months';
import {
	checkOutSchemaLogin,
	checkOutSchemaNonLogin,
} from '@/utils/validationSchema';
import { postJson, postJsonNoToken } from '@/api/api.instances';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import useDirection from '@/hooks/useDirection';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import ThankYouModal from './ThankYouModal';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import DonateModal from "./DonateModal"

const DonateModalStripe: React.FC<DonateModalType> = ({
	open,
	setOpen,
	cancelButtonRef,
	amount,
	familyId,
	isAddToCart,
}) => {


}