import React from 'react';

const Loan = () => {
    return (
        <div>
            {/* Top-part-end */}
            <div>
                <div class="hero min-h-screen bg-base-200">
                    <div class="hero-content flex-col lg:flex-row">
                        <img src="https://allaboutturkish.com/wp-content/uploads/2021/09/bank-customer-getting-loan-man-wheeling-cart-with-cash-flat-vector-illustration-finance-money-banking-service_74855-8233.jpg" class="max-w-sm rounded-lg shadow-2xl" />
                        <div>
                            <h1 className="text-4xl font-bold">We are always <span className='text-green-700 font-bold'>with you</span> .</h1>
                            <p class="py-6">Make your dream home a reality with easy home loans from Online Bank BD. Our wide range of options are designed to cater your every home financing need, be it purchasing a new flat, constructing a house or renovating your existing home. Allow us to be the finance partner of one of the biggest investments of your lifetime and give you a delightful experience of banking.</p>

                        </div>
                    </div>
                </div>
            </div>

            {/* box-text-new-start */}
            <section>
                <div className='mx-10 justify-center mt-5'>
                    <h3 className="text-3xl font-bold">Loan <span className='text-green-700 '>Informations</span></h3>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12 gap-8'>
                        <div class="card w-72 bg-green-500 hover:bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 className='text-2xl'>BDT 5 lac - BDT 2 Crore</h2>
                                <p className='text-2xl'>Loan Amount</p>
                            </div>
                        </div>
                        <div class="card w-72 bg-green-500  hover:bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 className='text-2xl'>1 - 25 years</h2>
                                <p className='text-2xl'>Loan Tenure</p>
                            </div>
                        </div>
                        <div class="card w-72 bg-green-500  hover:bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 className='text-2xl'>Competitive</h2>
                                <p className='text-2xl'>Interest Rate</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {/* home-loan-part */}
            <div class="hero min-h-screen bg-base-200 my-5">
                <div class="hero-content flex-col lg:flex-row-reverse">
                    <img src="https://bizdatainsights.com/wp-content/uploads/2021/12/home-loan.jpg" class="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <h1 class="text-5xl font-bold">Make your <span className='text-green-700 '>Own Home</span></h1>
                        <p class="py-6">Make your dream home a reality with easy home loans from Online Bank BD. Our wide range of options are designed to cater your every home financing need, be it purchasing a new flat, constructing a house or renovating your existing home. Allow us to be the finance partner of one of the biggest investments of your lifetime and give you a delightful experience of banking.</p>

                        <button class="btn btn-primary">Get Started</button>

                    </div>
                </div>
            </div>
            {/* home-loan-end */}

            {/* box-text-new-start */}
            <section>
                <div className='mx-10 justify-center mt-5'>
                    <h3 className="text-3xl font-bold">Loan <span className='text-green-700 '>Informations</span></h3>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12 gap-8'>
                        <div class="card w-72 bg-green-500  hover:bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 className='text-2xl'>BDT 1 Lac - BDT 20 Lac</h2>
                                <p className='text-2xl'>Loan Amount</p>
                            </div>
                        </div>
                        <div class="card w-72 bg-green-500  hover:bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 className='text-2xl'>12 - 60 months</h2>
                                <p className='text-2xl'>Loan Tenure</p>
                            </div>
                        </div>
                        <div class="card w-72 bg-green-500  hover:bg-base-100 shadow-xl">
                            <div class="card-body">
                                <h2 className='text-2xl'>Competitive</h2>
                                <p className='text-2xl'>Interest Rate</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* personal-loan-start */}
            <div class="hero min-h-screen bg-base-200 my-5">
                <div class="hero-content flex-col lg:flex-row">
                    <img src="https://us.123rf.com/450wm/netsay/netsay1609/netsay160932714/63517082-man-hand-writing-personal-loan-with-black-marker-on-visual-screen-isolated-on-sunbed-on-the-beach-bu.jpg?ver=6" class="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <h1 class="text-5xl font-bold">Personal <span className='text-green-700 '>Loan</span></h1>
                        <p class="py-6">Whatever the occasion or requirement, make smart financial choice with Online Bank BD Personal Loan to fulfill all your dreams, reach to new heights and make your day to day journey of life joyful.</p>
                        <button class="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
            {/* statup-loan-end */}

            {/* Calculate Emi-start */}
            <div className='my-10'>
                <div class="hero min-h-screen bg-base-200 ">
                    <div class="hero-content flex-col lg:flex-row-reverse">
                        <div class="text-center lg:text-left">
                            <h1 class="text-5xl font-bold">Calculate Emi</h1>
                            <p class="py-6">You can easily calculate your emi here.</p>
                        </div>
                        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <div class="card-body">
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Ammount</span>
                                    </label>
                                    <input type="text" placeholder="Input ammount here" class="input input-bordered" />
                                </div>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Tenure</span>
                                    </label>
                                    <input type="text" placeholder="Tenure" class="input input-bordered" />

                                </div>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Interest Rate</span>
                                    </label>
                                    <input type="text" placeholder="Interest Rate % here" class="input input-bordered" />
                                </div>
                                <div class="form-control mt-6">
                                    <button class="btn btn-primary  bg-green-700 border-0">Calculate</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>





            {/* collaps */}



            <h2 className="text-center text-3xl">Overview</h2>





            <div className='md:px-40 lg:px-96 px-12 py-3'>
                {/* collaps new-start */}
                <div class="collapse">
                    <input type="checkbox" />
                    <div class="collapse-title text-xl font-medium">
                        Click me to show/hide content
                    </div>
                    <div class="collapse-content">
                        <p>hello</p>
                    </div>
                </div>


                <div tabindex="0" className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
                    <input type="checkbox" />
                    <div class="collapse-title text-xl font-medium">
                        Features
                    </div>
                    <div className="collapse-content text-left">


                        <ul className='list-disc px-12' >
                            <li>Loan amount ranging from BDT 5 lac to BDT 200 lac</li>
                            <li>Repayment tenure 1 year to 25 years</li>
                            <li>Financing up to 70% of property value</li>
                            <li>Semi-pucca financing facility</li>
                            <li>Financing to Non Resident Bangladeshi (NRB)</li>
                            <li>Home loan with overdraft (OD) facility</li>
                            <li>No hidden cost</li>
                            <li>Early settlement facility</li>
                            <li>Loan across the country</li>
                        </ul>


                    </div>
                </div>


                <div>
                    <div tabindex="0" className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
                        <input type="checkbox" />
                        <div class="collapse-title text-xl font-medium">
                            Processing Fee
                        </div>
                        <div className="collapse-content">
                            <p>Please see the Schedule of Charges.</p>


                        </div>
                    </div>
                </div>
                <div>
                    <div tabindex="0" className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
                        <input type="checkbox" />
                        <div class="collapse-title text-xl font-medium">
                            Eligibility
                        </div>
                        <div className="collapse-content">

                            <ul className='list-disc px-12 text-left' >
                                <li>BDT 50,000 and above</li>
                                <li>BDT 30,000 (Government officials only)</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <div tabindex="0" className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
                        <input type="checkbox" />
                        <div class="collapse-title text-xl font-medium">
                            Required Documents
                        </div>
                        <div className="collapse-content">
                            <p>Download basic required documents for Home Loan, please Click here</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* collaps-end */}
        </div>

    );
};

export default Loan;