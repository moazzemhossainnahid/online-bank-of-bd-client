import React, { useEffect, useState } from 'react';
import { CardElement ,useStripe,useElements} from '@stripe/react-stripe-js';
import { toast } from "react-toastify";
import { Navigate, useNavigate } from 'react-router-dom';
import Loading from '../../../../Components/Components.Nahid/Loading';
const CheckoutForm = ({existingAccount,inputBalance}) => {
  const stripe = useStripe();
  const elements=useElements()
  const [ErrorMessage,setErrorMessage]=useState("")
  const [clientSecret,setClientSecret]=useState(null);
  const [customeLoader,seTcustomeLoader]=useState(false)
  const navigate =useNavigate()
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  useEffect(()=>{
    fetch("https://online-bank-of-bd-server-production.up.railway.app/create-payment-intent",{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({inputBalance:inputBalance})
    })
    .then(res=>res.json())
    .then(result=>{
        if(result?.clientSecret) setClientSecret(result.clientSecret)
    })
  },[inputBalance])
  // handle card deposit function
  //smLoader 
    const handleSubmit= async(event)=>{
        event.preventDefault()
        if(!stripe|| !elements){
            return;
        }
        const card = elements.getElement(CardElement);
        if(card=== null){
            return;
        }
        seTcustomeLoader(true)
        const {error, paymentMethod}=await stripe.createPaymentMethod({type:"card",card})
        if(error){
          seTcustomeLoader(false)
            console.log("error",error);
            setErrorMessage(error?.message)
        }else{
            setErrorMessage("")
            // confirm card deposit
            const {paymentIntent, error:intentError} = await stripe.confirmCardPayment(
               clientSecret ,
                {
                  payment_method: {
                    card: card,
                    billing_details: {
                      name: existingAccount?.name,
                      email:existingAccount?.accEmail,
                    },
                  },
                },
              );
            if(intentError){
              seTcustomeLoader(false)
                setErrorMessage(intentError?.message);
            }
            if(paymentIntent){
              //updated balance api start
                const depositBalance = existingAccount.balance + inputBalance;
                const name = existingAccount.name;
                const AccNo= existingAccount.AccNo;
                const balance =existingAccount.balance
                const updateBalance = { depositBalance,  name, AccNo, balance};
                const url = `https://online-bank-of-bd-server-production.up.railway.app/account/${existingAccount._id}`;
                fetch(url, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(updateBalance)
                })
                    .then(res => res.json())
                    .then(data => {
                        toast("Deposited Successfully!");
                    })
                // updated balance api end

                // transaction api start 
                const receiverStatementData = {
                  senderAccount: AccNo,
                  statement: "Deposit Money With Card",
                  deposit: inputBalance,
                  withdraw: 0,
                  balance: parseFloat(balance+inputBalance),
                  date: date,
                  email: existingAccount.accEmail,
              }
  
              fetch('https://online-bank-of-bd-server-production.up.railway.app/statement', {
                  method: 'POST',
                  headers: {
                      'content-type': 'application/json'
                  },
                  body: JSON.stringify(receiverStatementData)
              })
                  .then(res => res.json())
                  .then(data => {
                    seTcustomeLoader(false);
                      navigate("/dashboard/mytransactions")
                  })
                // transaction api end 
            
            }

        }
    }
    return (
        <form onSubmit={handleSubmit}>
      <CardElement
      className='mt-6 border-2 p-4 rounded-md'
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
      <p className='text-sm my-2 text-red-600 '>{ErrorMessage}</p>
      <button type="submit" className='py-4 px-3 w-full bg-green-600 rounded-md md:my-12 my-6 text-xl hover:bg-green-500 duration-300 ease-in-out text-white'
       disabled={!stripe || !clientSecret || customeLoader}>
        Deposit
      </button>
    </form>
    );
};

export default CheckoutForm;