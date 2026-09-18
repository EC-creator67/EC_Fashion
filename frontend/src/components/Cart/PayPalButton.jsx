import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const PayPalButton = ({ amount, onSuccess, onError }) => {
  console.log('PayPal button amount:', amount, typeof amount);

  const formattedAmount = parseFloat(amount || 0).toFixed(2);
  console.log('PayPal formatted amount:', formattedAmount);

  return (
    <PayPalScriptProvider
      options={{
        'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID,
      }}
    >
      <PayPalButtons
        style={{ layout: 'vertical' }}
        createOrder={(data, actions) => {
          console.log('Creating PayPal order with amount:', formattedAmount);
          return actions.order.create({
            purchase_units: [{ amount: { value: formattedAmount } }],
          });
        }}
        onApprove={(data, actions) => {
          console.log('PayPal payment approved:', data);
          return actions.order.capture().then((captureData) => {
            console.log('PayPal capture successful:', captureData);
            onSuccess(captureData);
          });
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
