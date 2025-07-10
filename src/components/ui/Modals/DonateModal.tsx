'use client';
import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { DonateModalType } from '@/types';
import Button from '../LandingPage/Button';
import { useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm'; // Ensure this component handles payment logic
import ThankYouModal from './ThankYouModal';
import { IoClose } from 'react-icons/io5';

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_REACT_APP_STRIPE_PUBLISHABLE_KEY}`);

const DonateModal: React.FC<DonateModalType> = React.memo(({
    open,
    setOpen,
    cancelButtonRef,
    familyId,
    isAddToCart,
    amount
}) => {
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [openThankYou, setOpenThankYou] = useState(false);
    const cancelThankYouButtonRef = useRef(null);
    const currencyState = useSelector((state: any) => state.currency);
    const t = useTranslations('DonateModal');
    const t1 = useTranslations('QuickDonation');

    const handleCheckout = () => {
        if ((amount as number) > 0) {
            setShowPaymentForm(true);
        }
    };

    const handlePaymentSuccess = () => {
        setShowPaymentForm(false);
        setOpenThankYou(true);
        setOpen(false);
        // Additional logic after payment success, like state updates
    };

    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-[100]"
                    initialFocus={cancelButtonRef}
                    onClose={() => setOpen(false)}
                >
                    {/* Overlay */}
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

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="flex flex-col justify-between gap-4 p-6 bg-white rounded-2xl shadow-xl md:w-[500px]">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-semibold">{t('title1')}</h2>
                                        <div className="rounded-full bg-gray-200 hover:bg-gray-300 p-1">
                                            <IoClose
                                                className="text-2xl cursor-pointer"
                                                onClick={() => setOpen(false)}
                                            />
                                        </div>
                                    </div>

                                    {/* Display amount */}
                                    <div className="flex justify-between">
                                        <h3 className="text-lg font-semibold">{t('amount')}</h3>
                                        <h3 className="text-lg font-semibold">
                                            {currencyState.key} {amount}
                                            {/* {currencyState.key} */}
                                        </h3>
                                    </div>

                                    {/* Payment Form or Donate Button */}
                                    {!showPaymentForm ? (
                                        <div>
                                            <Button
                                                onClick={handleCheckout}
                                                title={t('submit')}
                                                className="w-full"
                                                Color="#8DAE8E"
                                                // disabled={(amount as number) <= 0}
                                                disabled={(amount as number) > 0 ? false : true}
                                            />
                                        </div>
                                    ) : (
                                        <Elements stripe={stripePromise}>
                                            <PaymentForm
                                                amount={amount}
                                                currency={currencyState.key.toLowerCase()}
                                                onPaymentComplete={handlePaymentSuccess}
                                                familyId={familyId}
                                                isAddToCart={isAddToCart}
                                                t={t}

                                            />
                                        </Elements>
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            <ThankYouModal
                open={openThankYou}
                setOpen={setOpenThankYou}
                cancelButtonRef={cancelThankYouButtonRef}
            />
        </>
    );
});

export default DonateModal;