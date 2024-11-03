

'use client';
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { Fragment, useState, useEffect, useRef} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { QuickDonationModalType } from '@/types';
import Button from '../LandingPage/Button';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import useLocaleRouter from '@/hooks/useLocaleRouter';
import { useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { useTranslations } from 'next-intl';


import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import ThankYouModal from './ThankYouModal';




// const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_REACT_APP_STRIPE_PUBLISHABLE_KEY}`).catch(err => {
// 	console.error('Failed to initialize Stripe:', err);
//   });
const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_REACT_APP_STRIPE_PUBLISHABLE_KEY}`)

const QuickDonationModal: React.FC<QuickDonationModalType> = ({
  open,
  setOpen,
  cancelButtonRef,
  amount = 0,
  setAmount,
  setDonate,
}) => {
  const { dir } = useLocaleRouter();
  const { user } = useLoggedInUser();
  const t = useTranslations('QuickDonation');
  const [openInputField, setOpenInputField] = useState<boolean>(false);
  const [inputAmount, setInputAmount] = useState<number>(0);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const amountQuickDonation: number[] = [25, 50, 100, 200, 400];
  const currencyState = useSelector((state: any) => state.currency);
  const [openThankYou, setOpenThankYou] = useState<boolean>(false);
  const cancelThankYouButtonRef = useRef(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setInputAmount(isNaN(value) ? 0 : value);
  };const [isStripeLoading, setIsStripeLoading] = useState(true);

  useEffect(() => {
	stripePromise.then(() => setIsStripeLoading(false));
  }, []);

  useEffect(() => {
    setAmount && setAmount(inputAmount === 0 ? 0 : inputAmount);
  }, [inputAmount]);


  const handleCheckout = () => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if ((amount as number) > 0) {
      setShowPaymentForm(true);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPaymentForm(false);
	setOpenThankYou(true)
    setOpen(false);
    setDonate && setDonate(true);
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

          <div dir={dir} className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              {/* Modal Content */}
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className="flex flex-col justify-between gap-4 p-6 transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all md:w-[500px]"
                >
                  {/* Header */}
                  <div className="flex justify-between items-center w-full">
                    <h2 className="text-xl text-gray-800 font-semibold">{t('title')}</h2>
                    <div className="rounded-full bg-gray-200 hover:bg-gray-300 p-1">
                      <IoClose
                        className="text-2xl text-gray-800 cursor-pointer"
                        onClick={() => setOpen(false)}
                      />
                    </div>
                  </div>

                  
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm text-gray-800 font-medium">{t('purposeTitle')}</h4>
                    <input
                      type="text"
                      disabled
                      value={t('purposeValue')}
                      className="py-2 px-3 text-base font-medium rounded-xl text-gray-600 border border-gray-300"
                    />
                  </div>

                  
                  <div className="grid grid-cols-3 gap-4">
                    {amountQuickDonation.map((price, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setOpenInputField(false);
                          setAmount && setAmount(price);
                        }}
                        className={`h-11 text-sm font-semibold border rounded-xl transition-colors duration-300 ease-in-out ${
                          price === amount
                            ? 'text-red-600 border-red-600'
                            : 'text-gray-800 border-gray-300'
                        } hover:text-red-600 hover:border-red-600`}
                      >
                        {currencyState.key} {price}
                      </button>
                    ))}
                    <button
                      className={`h-11 text-sm font-semibold border rounded-xl transition-colors duration-300 ease-in-out ${
                        openInputField
                          ? 'text-red-600 border-red-600'
                          : 'text-gray-800 border-gray-300'
                      } hover:text-red-600 hover:border-red-600`}
                      onClick={() => {
                        setAmount && setAmount(0);
                        setOpenInputField(true);
                      }}
                    >
                      {t('anotherAmount')}
                    </button>
                  </div>

                  {/* Custom Amount Input */}
                  {openInputField && (
                    <div>
                      <input
                        type="text"
                        className="w-full py-2 px-3 text-base font-medium rounded-xl text-gray-600 border border-gray-300 focus:outline-none focus:border-red-600"
                        value={inputAmount || ''}
                        onChange={handleInputChange}
                        placeholder={t('inputPlaceholder')}
                        autoFocus
                      />
                    </div>
                  )}

                  {/* Total Amount */}
                  <div className="flex justify-between">
                    <h3 className="text-lg text-gray-800 font-semibold">{t('totalTitle')}</h3>
                    <h3 className="text-lg text-gray-800 font-semibold">
                      {currencyState.key} {amount}
                    </h3>
                  </div>

                  {/* Payment Form or Donate Button */}
                  {!showPaymentForm ? (
                    <div>
                      <Button
                        onClick={handleCheckout}
                        title={t('button')}
                        className="w-full"
                        Color="#8DAE8E"
                        disabled={(amount as number) > 0 ? false : true}
                      />
                    </div>
                  ) : (
                    <Elements stripe={stripePromise}>
                      <PaymentForm
                        amount={amount}
						            t={t} // Pass t function here
                        currency={currencyState.key.toLowerCase()}
                        onPaymentComplete={handlePaymentSuccess}
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
};



export default QuickDonationModal;