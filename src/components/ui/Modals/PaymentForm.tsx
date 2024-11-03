import React, { useState, useRef, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from '../LandingPage/Button';
import ThankYouModal from './ThankYouModal';
import { useTranslations } from 'next-intl';
import useLoggedInUser from '@/hooks/useLoggedInUser';
import { useSelector } from 'react-redux';

interface PaymentFormProps {
  amount: any;
  currencyState: any;
  currency: any;
  t: (key: string) => string;
  onPaymentComplete: () => void;
  userEmail?: string;
  familyId: any;
  isAddToCart: any;
}
interface CurrencyState {
  key: string;
  // add other properties as needed
}
const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  currencyState,
  t,
  onPaymentComplete,
  userEmail,
  currency,
  familyId,
  isAddToCart
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cartItems = useSelector((state: any) => state.cart);
  const [isAddToCartValues, setIsAddToCartValues] = useState<any[]>([]);
  const t1 = useTranslations('DonateModal');
  const { user } = useLoggedInUser();

  const handleCheckout = async () => {
    if (amount <= 0) return;

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/donate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount * 100,
          currency: currency
        })
      });

     

      const { clientSecret } = await response.json();

      if (!stripe || !elements) {
        throw new Error('Stripe not initialized');
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            email: userEmail,
          },
        },
      });
      if (!result.error) {
        onPaymentComplete();
      } else {
        setError(result.error.message || 'Payment failed');
      }
    } catch (error: any) {
      setError(error.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };


  const handleCheckoutUser = async () => {
    if (amount <= 0) return;

    setIsProcessing(true);
    setError(null);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/donate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: amount * 100,
                currency: currency
            })
        });

        const { clientSecret } = await response.json();
        console.log("clientSecret", clientSecret)

        if (!stripe || !elements) {
            throw new Error('Stripe not initialized');
        }

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)!,
                billing_details: {
                    email: userEmail,
                },
            },
        });

        if (!result.error) {
            // Payment was successful, call onPaymentComplete
            onPaymentComplete();

            // Now hit another endpoint to save the data
            const saveResponse = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/save-donation`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: amount,
                    family: familyId, // Ensure familyId is available in the scope
                    sponsor: user?.id, // Ensure sponsorId is available in the scope
                    name: user?.name, // Ensure userName is available in the scope
                    email: user?.email,
                    currency: currency
                }),
            });

            // Optionally handle the response of the save request
            const saveData = await saveResponse.json();
            console.log('Donation saved:', saveData);
        } else {
            setError(result.error.message || 'Payment failed');
            console.log(result.error)
        }
    } catch (error: any) {
        setError(error.message || 'Payment failed. Please try again.');
        console.log(error)
    } finally {
        setIsProcessing(false);
    }
};

const handleCheckoutCartUser = async () => {
  if (amount <= 0) return;

  setIsProcessing(true);
  setError(null);

  try {
      // Step 1: Create an array of updated donation values if adding to cart
      const updatedValues =  cartItems.map((family: any) => ({
        family: family._id,
        amount: family.amount,
        sponsor: user?.id,
        name: user?.name,
        email: user?.email,
        currency: currency
    })) 
    setIsAddToCartValues(updatedValues);

      // Step 2: Process payment with Stripe
      const response = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/donate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              amount: amount * 100,
              currency: currency
          })
      });

      const { clientSecret } = await response.json();
      console.log("clientSecret", clientSecret);

      if (!stripe || !elements) {
          throw new Error('Stripe not initialized');
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
              card: elements.getElement(CardElement)!,
              billing_details: {
                  email: userEmail,
              },
          },
      });

      // Step 3: Handle the result of the payment
      if (!result.error) {
          // Payment was successful
          onPaymentComplete();

          // Step 4: Save the donations if adding to cart
          if (isAddToCartValues) {
              const saveResponse = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/donate-families`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ donations: updatedValues }),
              });

              const saveData = await saveResponse.json();
              console.log('Donations Cart saved:', saveData);
          }
      } else {
          setError(result.error.message || 'Payment failed');
          console.log(result.error);
      }
  } catch (error: any) {
      setError(error.message || 'Payment failed. Please try again.');
      console.log(error);
  } finally {
      setIsProcessing(false);
  }
};


  return (
    <>
      <div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
           {t1("cardDetail")}
          </label>
          <div className="p-3 border rounded-md">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
        </div>
        {error && (
          <div className="text-red-500 text-sm mb-4">
            {error}
          </div>
        )}
        <Button
          onClick={() => {
            if (user) {
                if (isAddToCart) {
                    handleCheckoutCartUser();
                } else {
                    handleCheckoutUser();
                }
            } else {
                handleCheckout();
            }
        }}
        
          title={t1('submit')}
          className="w-full"
          Color="#8DAE8E"
          disabled={!stripe || !elements || amount <= 0 || isProcessing}
          isLoading={isProcessing}
        />
      </div>
    </>
  );
};

export default PaymentForm;
