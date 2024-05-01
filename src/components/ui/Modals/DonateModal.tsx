'use client';
import React, { Fragment, useState, useEffect } from 'react';
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

const DonateModal: React.FC<DonateModalType> = ({
	open,
	setOpen,
	cancelButtonRef,
	amount,
	familyId,
	isAddToCart,
}) => {
	const { user } = useLoggedInUser();
	const currencyState = useSelector((state: any) => state.currency);
	const cartItems = useSelector((state: any) => state.cart);
	const [loading, setLoading] = useState<boolean>(false);
	const [isAddToCartValues, setIsAddToCartValues] = useState<any[]>([]);
	const t = useTranslations('DonateModal');
	const { dir } = useLocaleRouter();
	const t1 = useTranslations('QuickDonation');

	useEffect(() => {
		fetch('https://api.ipify.org?format=json')
			.then((response) => response.json())
			.then((data) => {
				DonateForm.setFieldValue('ip', data.ip);
			})
			.catch((error) => {
				console.error(error);
			});

		DonateForm.setFieldValue('amount', amount);
		DonateForm.setFieldValue('family', familyId);
		user && DonateForm.setFieldValue('sponsor', user.id);
	}, [amount, familyId]);

	const loginInitialValues = {
		name: '',
		country: '',
		city: '',
		email: '',
		address: '',
		mobilePhoneNumber: '',
		nationalIdentityNumber: '',
		ip: '',
	};

	const initialValues = {
		cardHolderName: '',
		cardNumber: '',
		expireMonth: '',
		expireYear: '',
		cvc: '',
	};

	if (user) {
		Object.assign(initialValues, loginInitialValues);
	}

	const postNonLoginData = async (values: any) => {
		try {
			setLoading(true);
			const res = await postJsonNoToken(
				`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/non/donate/family`,
				values,
			);
			if (res.success) {
				setLoading(false);
				// DonateForm.resetForm();
				setOpen(false);
				toast.success(`${t('success')}`, {
					toastId: 'success',
					position: 'top-right',
					autoClose: 4000,
				});
			}
		} catch (error) {
			// console.log(error);
			setLoading(false);
			toast.error(`${t('error')}`, {
				toastId: 'error',
				position: 'top-right',
				autoClose: 4000,
			});
		}
	};


	const postLoginData = async (values: any) => {
		if (isAddToCart) {
			const updatedValues = cartItems.map((family: any) => ({
				...values,
				family: family._id,
				amount: family.amount,
			}));
			setIsAddToCartValues(updatedValues);
	
			setLoading(true);
			try {
				const res = await postJson(
					`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/donate/family`,
					{ donations: updatedValues },
					user?.key,
				);
				// console.log("res", res)
				if (res.success) {
					// console.log("res", res)
					setLoading(false);
					setOpen(false);
					toast.success(`${t('success')}`, {
						toastId: 'success',
						position: 'top-right',
						autoClose: 4000,
					});
				} else {
					setLoading(false);
					toast.error(`${t('donationFailed')}`, {
						toastId: 'error',
						position: 'top-right',
						autoClose: 4000,
					});
				}
			} catch (error) {
				// console.log(error)
				setLoading(false);
				toast.error(`${t('error')}`, {
					toastId: 'error',
					position: 'top-right',
					autoClose: 4000,
				});
			}
		} else {
			setLoading(false);
			toast.error(`${t('donationFailed')}`, {
				toastId: 'error',
				position: 'top-right',
				autoClose: 4000,
			});
		}
	};
	

	const postLoginDataSingleDonate = async (values: any) => {
		try {
			setLoading(true);
			const res = await postJson(
				`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/donate/single/family`,
					values,
					user?.key,
			);
			if (res.success) {
				setLoading(false);
				// DonateForm.resetForm();
				setOpen(false);
				toast.success(`${t('success')}`, {
					toastId: 'success',
					position: 'top-right',
					autoClose: 4000,
				});
			}
		} catch (error) {
			// console.log(error);
			setLoading(false);
			toast.error(`${t('error')}`, {
				toastId: 'error',
				position: 'top-right',
				autoClose: 4000,
			});
		}
	};
			
	const DonateForm = useFormik({
		initialValues: initialValues,
		validationSchema: user ? checkOutSchemaLogin : checkOutSchemaNonLogin,
		onSubmit: async (values: any) => {
			if (user && isAddToCart) {
				postLoginData(values);
			} 
			else if(user){
				postLoginDataSingleDonate(values)
			}
			else {
				postNonLoginData(values);
			}
		},
	});

	return (
		<>
			<Transition.Root show={open} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
					initialFocus={cancelButtonRef}
					onClose={setOpen}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<div
						className="fixed inset-0 z-10 w-screen overflow-y-auto"
						dir={dir}
					>
						<div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								enterTo="opacity-100 translate-y-0 sm:scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0 sm:scale-100"
								leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							>
								<Dialog.Panel className=" py-4 px-5 rounded-2xl transform overflow-hidden bg-[#fff] text-left shadow-xl transition-all md:w-[500px] h-[550px]">
									{/* first div */}
									<form
										onSubmit={DonateForm.handleSubmit}
										className="flex flex-col justify-between w-full h-full"
									>
										<div
											className="flex justify-between items-center w-full"
											dir={dir}
										>
											<h2 className="  text-2xl font-semibold">
												{user ? t('title2') : t('title1')}
											</h2>
											<div className=" rounded-[50%] bg-[#857b7b40] hover:bg-[#857b7b80] p-1">
												<IoClose
													className=" text-[26px] text-[#4a4b65] cursor-pointer"
													onClick={() => setOpen(false)}
												/>
											</div>
										</div>

										<div
											className=" flex flex-col gap-3 pt-1 overflow-y-auto h-[70%] scrollbarHide"
											dir={dir}
										>
											{user && (
												<>
													<ModalInput
														label={t('name')}
														placeholder= {t1('placeholdername')} 
														type="text"
														name="name"
														value={DonateForm.values?.name}
														onChange={DonateForm.handleChange}
													/>
													{DonateForm.touched.name &&
														DonateForm.errors.name && (
															<p className="text-sm mb-2 text-red">
																{DonateForm.errors.name as any}
															</p>
														)}
													<ModalInput
														label={t('email')}
														placeholder="Ahmed@gmail.com"
														type="email"
														name="email"
														value={DonateForm.values?.email}
														onChange={DonateForm.handleChange}
													/>
													{DonateForm.touched.email &&
														DonateForm.errors.email && (
															<p className="text-sm mb-2 text-red">
																{DonateForm.errors.email as any}
															</p>
														)}
													<ModalInput
														label={t('address')}
														placeholder= {t1('placeholderaddress')} 
														type="text"
														name="address"
														value={DonateForm.values?.address}
														onChange={DonateForm.handleChange}
													/>
													{DonateForm.touched.address &&
														DonateForm.errors.address && (
															<p className="text-sm mb-2 text-red">
																{DonateForm.errors.address as any}
															</p>
														)}
													<ModalInput
														label={t('mobileNum')}
														placeholder="526397444"
														type="number"
														name="mobilePhoneNumber"
														value={DonateForm.values?.mobilePhoneNumber}
														onChange={DonateForm.handleChange}
													/>
													{DonateForm.touched.mobilePhoneNumber &&
														DonateForm.errors.mobilePhoneNumber && (
															<p className="text-sm mb-2 text-red">
																{DonateForm.errors.mobilePhoneNumber as any}
															</p>
														)}
													<ModalInput
														label={t('identityNum')}
														placeholder="526397444999"
														type="number"
														name="nationalIdentityNumber"
														value={DonateForm.values?.nationalIdentityNumber}
														onChange={DonateForm.handleChange}
													/>
													{DonateForm.touched.nationalIdentityNumber &&
														DonateForm.errors.nationalIdentityNumber && (
															<p className="text-sm mb-2 text-red">
																{
																	DonateForm.errors
																		.nationalIdentityNumber as any
																}
															</p>
														)}
													<ModalInput
														label={t('city')}
														placeholder="Karachi"
														type="text"
														name="city"
														value={DonateForm.values?.city}
														onChange={DonateForm.handleChange}
													/>
													{DonateForm.touched.city &&
														DonateForm.errors.city && (
															<p className="text-sm mb-2 text-red">
																{DonateForm.errors.city as any}
															</p>
														)}
													<Select
														title={t('country')}
														name="country"
														className="max-w-[800px] w-full mb-8"
														onChange={DonateForm.handleChange}
														value={DonateForm.values.country}
														// defaultValue={t('country.default')}
														titleColor="text-[#000000]"
														textColor="text-[#00000080]"
														BgColor="bg-[#F8F8F8]"
														options={countriesData.map((country) => ({
															label: country.name,
															value: country.code,
														}))}
													/>
													{DonateForm.touched.country &&
														DonateForm.errors.country && (
															<p className="text-sm mb-2 text-red">
																{DonateForm.errors.country as any}
															</p>
														)}
												</>
											)}
											<ModalInput
												label={t('cardHolder')}
												placeholder= {t1('cardname')}
												type="text"
												name="cardHolderName"
												value={DonateForm.values?.cardHolderName}
												onChange={DonateForm.handleChange}
											/>
											{DonateForm.touched.cardHolderName &&
												DonateForm.errors.cardHolderName && (
													<p className="text-sm mb-2 text-red">
														{DonateForm.errors.cardHolderName as any}
													</p>
												)}
											<ModalInput
												label={t('cardNum')}
												placeholder="123654125852"
												type="text"
												name="cardNumber"
												value={DonateForm.values?.cardNumber}
												onChange={DonateForm.handleChange}
											/>
											{DonateForm.touched.cardNumber &&
												DonateForm.errors.cardNumber && (
													<p className="text-sm mb-2 text-red">
														{DonateForm.errors.cardNumber as any}
													</p>
												)}
											<Select
												title={t('expMonth')}
												name="expireMonth"
												className="max-w-[800px] w-full mb-8"
												onChange={DonateForm.handleChange}
												value={DonateForm.values.expireMonth}
												// defaultValue={t('country.default')}
												titleColor="text-[#000000]"
												textColor="text-[#00000080]"
												BgColor="bg-[#F8F8F8]"
												options={monthsData.map((month) => ({
													label: month,
													value: month,
												}))}
											/>
											{DonateForm.touched.expireMonth &&
												DonateForm.errors.expireMonth && (
													<p className="text-sm mb-2 text-red">
														{DonateForm.errors.expireMonth as any}
													</p>
												)}
											<div className=" flex gap-3">
												<div className=" flex flex-col gap-2">
													<ModalInput
														label={t('expYear')}
														placeholder="2023"
														type="number"
														name="expireYear"
														value={DonateForm.values?.expireYear}
														onChange={DonateForm.handleChange}
													/>
													{DonateForm.touched.expireYear &&
														DonateForm.errors.expireYear && (
															<p className="text-sm mb-2 text-red">
																{DonateForm.errors.expireYear as any}
															</p>
														)}
												</div>

												<div className=" flex flex-col gap-2">
													<ModalInput
														label={t('cvc')}
														placeholder="551"
														type="number"
														name="cvc"
														value={DonateForm.values?.cvc}
														onChange={DonateForm.handleChange}
													/>
													{DonateForm.touched.cvc && DonateForm.errors.cvc && (
														<p className="text-sm mb-2 text-red">
															{DonateForm.errors.cvc as any}
														</p>
													)}
												</div>
											</div>
											{/* <ModalInput
												label="Enter Amount"
												placeholder="300"
												name="totalAmount"
												type="text"
												value={amount ? amount : DonateForm.values?.totalAmount}
												onChange={DonateForm.handleChange}
												disabled={user ? true : false}
											/> */}
										</div>

										<div className=" flex flex-col gap-3 w-full">
											<div className=" flex justify-between items-center">
												<h3 className=" text-2xl font-bold">{t('total')}</h3>
												<h3 className=" text-2xl font-bold">
													{currencyState.key}{' '}
													{amount ? amount : DonateForm.values?.totalAmount}
												</h3>
											</div>

											<Button
												title={t('submit')}
												className="  w-full"
												isLoading={loading}
												type="submit"
												Color="#CF7475"
											/>
										</div>
									</form>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
};

export default DonateModal;
