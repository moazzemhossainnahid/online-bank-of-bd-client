import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import axios from 'axios';
import useAccount from '../../../Components/Components.Nahid/Hooks/useAccount';

const SmeLoan = () => {
  const [user] = useAuthState(auth);
  const { loanId } = useParams();
  const [loanInfo, setLoanInfo] = useState({});
  const [calculator, setCalculator] = useState();
  const navigate = useNavigate();
  const [loanAmountIV, setLoanAmountIV] = useState();
  const [payment_TypeIV, setPayment_TypeIV] = useState();
  const [loan_periodIV, setLoan_periodIV] = useState();
  const { myAccount } = useAccount();
  const frstacc = myAccount && myAccount[0]?.AccNo;
  const [selectAcc, setSelectAcc] = useState(frstacc);

  const handleSelect = (e) => {
    const acc = e.target.value;
    setSelectAcc(acc);
  }

  const account = myAccount?.filter(acc => acc?.role === 'approved');


  useEffect(() => {
    const url = `https://online-bank-of-bd-server-production.up.railway.app/smeBanking/${loanId}`

    fetch(url)
      .then(res => res.json())
      .then(data => setLoanInfo(data))
  }, [])
  

  const handleLoanCalculator = e => {
    e.preventDefault();
    const loanAmount = e.target.loanAmount.value;
    setLoanAmountIV(loanAmount);
    const interestRate = e.target.interestRate.value;
 
    const Payment_Type = e.target.Payment_Type.value;
    setPayment_TypeIV(Payment_Type)
    const Loan_period = e.target.Loan_period.value;
    setLoan_periodIV(Loan_period);

    const compoundingYear = parseInt(loanAmount) * parseInt(interestRate);
    const interestPercent = compoundingYear / 100;
    const sum = parseInt(loanAmount) + interestPercent;
    const result = sum / parseInt(Payment_Type);
    const calculate = result / parseInt(Loan_period);
    setCalculator(calculate.toFixed())
  }

  const handleBooking = (e) => {
    e.preventDefault();

    const applyLoan = {

      // Loan Information
      totalAmountTotal: loanAmountIV,      
      interestTotal: "10%",
      loanType: payment_TypeIV,
      loanPeriodYear: loan_periodIV,
      status: "Pending",
      loanFromAcc: e.target.loanFromAcc.value,

      // User Information      
      userEmail: user.email,
      userName: user.displayName,
      needToPayForEveryTransaction: calculator,
      phone: e.target.phone.value,
      address: e.target.address.value,
    }

    // Post Loan to the request

    axios.post('https://online-bank-of-bd-server-production.up.railway.app/applyLoan', applyLoan)
      .then((res) => {
        // console.log(res);
        navigate("/loanApplicationSuccess")
      })
      .catch((error) => {
        // console.log(error);
      });

  }


  return (
    <div>

      <div className="hero min-h-screen bg-slate-100">
        <div className="hero-content grid lg:grid-cols-3">
          <div>
            <img src={loanInfo.loan_img} className="max-w-sm rounded shadow-2xl mask mask-circle" alt='img' />
            <h1 className="text-5xl font-bold">{loanInfo.loan_name}</h1>
          </div>
          <div>


            <form onSubmit={handleLoanCalculator}>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Loan Amount(USD.)</span>

                </label>
                <input type="number" name='loanAmount' placeholder="Type Loan Amount" className="input input-bordered w-full max-w-xs" />

                <label className="label">
                  <span className="label-text">Interest Rate(%)</span>
                </label>
                <input disabled value={loanInfo.Interest} type="number" name='interestRate' className="input input-bordered w-full max-w-xs" />

                <label className="label">
                  <span className="label-text">Payment Type</span>
                </label>

                <select className="select select-bordered w-full max-w-xs" name="Payment_Type">
                  <option value='12' selected>Monthly</option>
                  <option value='4'>Quarterly</option>
                  <option value='2'>Half_Yearly</option>
                  <option value='1'>Yearly</option>

                </select>

                <label className="label">
                  <span className="label-text">Loan period in years</span>
                </label>

                <select className="select select-bordered w-full max-w-xs" name="Loan_period">

                  <option selected>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </select>
              </div>


              <input className='m-5 px-5 btn bg-primary text-white' type="submit" value="Calculate" />
              <input className='m-5 px-5 btn text-white bg-red-700' type="reset" value="Reset" />
            </form>
            {
              calculator && <h1 className='text-5xl font-bold mb-10'>Total Amount: {calculator}</h1>
            }
          </div>



          <div>



            {/* <p>{loanInfo.loan_name} এর জন্য আপনি {loanAmountIV} টাকা সিলেক্ট করেছেন। {loan_periodIV} বছরের মধ্যে  {loanInfo.Interest} % সুদে  {loanAmountIV}  টাকা loan পরিশোধের জন্য আপনাকে বছরে {payment_TypeIV} বার {calculator} টাকা করে দিতে হবে</p> */}




            <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 justify-items-center mt-3'>

              {
                calculator &&
                <div className="form-control w-full max-w-xs">
                  <p name='text' className="font-bold" value="4">{loanInfo.loan_name} এর জন্য আপনি {loanAmountIV} টাকা সিলেক্ট করেছেন। {loan_periodIV} বছরের মধ্যে  {loanInfo.Interest} % সুদে  {loanAmountIV}  টাকা loan পরিশোধের জন্য আপনাকে বছরে {payment_TypeIV} বার {calculator} টাকা করে দিতে হবে</p>
                </div>
              }

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Your Email Address</span>

                </label>
                <input type="email" name='email' disabled value={user?.email} className="input input-bordered input-accent w-full max-w-xs" />
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Your Name</span>

                </label>
                <input type="text" name='name' disabled value={user?.displayName} className="input input-bordered input-accent w-full max-w-xs" />
              </div>

              {
                account && <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Select Your Account</span>
                  </label>
                  <select class="select select-bordered w-full max-w-xs" name="loanFromAcc">
                    {
                      account?.map(account => <option >{account?.AccNo}</option>)
                    }
                  </select>

                </div>
              }


              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">please type your Phone number</span>

                </label>
                <input type="number" name='phone' placeholder="Phone" className="input input-bordered input-accent w-full max-w-xs" required />
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">please type your Address</span>

                </label>
                <textarea name='address' className="textarea resize-none textarea-bordered h-18" placeholder="Address" required></textarea>
              </div>

              <input type="submit" value="Apply Loan" className="btn btn-primary w-full max-w-xs" />

            </form>










          </div>
        </div>
      </div>


    </div>
  );
};

export default SmeLoan;