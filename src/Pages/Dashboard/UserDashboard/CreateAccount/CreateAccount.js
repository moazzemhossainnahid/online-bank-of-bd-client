import React, { useState } from "react";
import { UseContextProvider } from "../../../../Components/Components.Nahid/StepperContext";
import Stepper from "./Controls/Stepper";
import StepperControl from "./Controls/StepperControl";
import Account from "./Steps/Account";
import Details from "./Steps/Details";
import Final from "./Steps/Final";
import Payment from "./Steps/Payment";



const CreateAccount = () => {

<<<<<<< HEAD
    // const [user, loading] = useAuthState(auth);

    // const legaleNameRef = useRef('');
    // const phoneRef = useRef('');
    // const nidRef = useRef('');
    // const dateOfBirthRef = useRef('');
    // const addressRef = useRef('');
    // const genderRef = useRef('');
    // const countryRef = useRef('');
    // const emailRef = useRef('');



    // if (loading) {
    //     return <Loading />
    // }


    // const createAccount = e => {
    //     e.preventDefault();
    //     const name = legaleNameRef.current.value;
    //     const phone = phoneRef.current.value;
    //     const nid = nidRef.current.value;
    //     const dateOfBirth = dateOfBirthRef.current.value;
    //     const gender = genderRef.current.value;
    //     const country = countryRef.current.value;
    //     const address = addressRef.current.value;
    //     const email = emailRef.current.value;

    //     console.log(name, phone, nid, dateOfBirth, gender, country, address, country, email);

    //     const accoutnDetails = {
    //         name: name,
    //         phone: phone,
    //         NID: nid,
    //         dateOfBirth: dateOfBirth,
    //         gender: gender,
    //         country: country,
    //         address: address,
    //         AccNo: Math.floor(Math.random() * 10000000000),
    //         balance: 0,
    //         email: email,
    //         actype: "Savings Account",
    //         authemail: user.email,
    //     }

    //     fetch('https://online-bank-of-bd-server-production.up.railway.app/account', {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(accoutnDetails)
    //     })
    //         .then(res => res.json())
    //         .then(data => {

    //             legaleNameRef.current.value = '';
    //             nidRef.current.value = '';
    //             phoneRef.current.value = '';
    //             dateOfBirthRef.current.value = '';
    //             genderRef.current.value = '';
    //             legaleNameRef.current.value = '';
    //             emailRef.current.value = '';
    //             addressRef.current.value = '';

    //             toast("Account Created Successfully!")
    //         })
    // }
=======
<<<<<<< HEAD
>>>>>>> b048257e20a865ebcfa449362a6c92077aaf4ab9
=======
>>>>>>> 8080a74c8034bd5633d5fbcd33e237f146da228b
>>>>>>> 95b940778481743fb027ab794c1c2d654aa83d11

    const [currentStep, setCurrentStep] = useState(1);

    const steps = [
        "Contact Information",
        "Account Information",
        "Personal Details",
        "Applicant Photo",
        "Application Preview",
        "Complete",
    ];

    const displayStep = (step) => {
        switch (step) {
            case 1:
                return <Account />;
            case 2:
                return <Details />;
            case 3:
                return <Payment />;
            case 4:
                return <Final />;
            default:
        }
    };

    const handleClick = (direction) => {
        let newStep = currentStep;

        direction === "next" ? newStep++ : newStep--;
        // check if steps are within bounds
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    };

    return (
        <div>
            <div className="h-full w-full">
                <div className="card-body w-full">
                    <h1 className="text-primary text-2xl pb-5 font-bold text-center">
                        Application for Account Opening
                    </h1>

                    {/* <form action="" onSubmit={createAccount}>

                            <div className="flex flex-wrap justify-between">

                                <div className="form-control flex-1 mr-2">
                                    <label className="label">
                                        <span className="label-text">Your Name</span>
                                    </label>
                                    <input required type="text" placeholder="Legal Name" className="input input-bordered" ref={legaleNameRef} />
                                </div>
                                <div className="form-control flex-1 ml-2">
                                    <label className="label">
                                        <span className="label-text">Phone</span>
                                    </label>
                                    <input required type="number" placeholder="+880 12345678" className="input input-bordered" ref={phoneRef} />
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-between items-center">


                                <div className="form-control text-left flex-1 mr-2">
                                    <label className="label">
                                        <span className="label-text">Birthday</span>
                                    </label>

                                    <input type="date" ref={dateOfBirthRef} id="birthday" name="birthday" className="input input-bordered" />
                                </div>

                                <div className="form-control mr-2">
                                    <label className="label">
                                        <span className="label-text">Gender</span>
                                    </label>

                                    <select ref={genderRef} className="select w-full max-w-xs">
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                            </div>


                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text">Your Country</span>
                                </label>

                                <select ref={countryRef} className="select w-full max-w-xs">
                                    {
                                        allCountry.map(country => <option>{country?.name?.common}</option>)
                                    }
                                </select>
                            </div>

                            <div className="flex flex-wrap justify-between items-center">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input ref={emailRef} defaultValue={user?.email} type="email" placeholder="Phone" className="input input-bordered" />
                                </div>

                                <div className="form-control flex-1 ml-2">
                                    <label className="label">
                                        <span className="label-text">Your NID Number</span>
                                    </label>
                                    <input required type="number" placeholder="NID Number" className="input input-bordered" ref={nidRef} />
                                </div>
                            </div>

                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text">Address</span>
                                </label>
                                <input ref={addressRef} type="text" placeholder="Type your address" className="input input-bordered" />
                            </div>

                            <div className="form-control mt-6">
                                <input type="submit" className="btn bg-primary text-white " value="Create Account" />
                            </div>

                        </form> */}

                    {/* <form onSubmit={createAccount} className='space-y-8 w-full mx-auto lg:w-4/5' >
                        <div className='flex flex-col lg:flex-row gap-8'>
                            <input required name='name' className='input w-full px-5' type='text' placeholder='Your name' />
                            <input required name='email' className='input w-full px-5' type='email' placeholder='Your email' />
                        </div>
                        <div className="">
                            <input required name='subject' className='input w-full px-5' type='text' placeholder='Subject' />
                        </div>
                        <div className="">
                            <textarea required name='message' className='textarea w-full px-5 resize-none' placeholder='Your message'></textarea>
                        </div>
                        <input type='submit' value="Create Account" className='btn btn-lg bg-green-700 text-white hover:bg-secondary-hover' />
                    </form> */}

                    <div className="pb-5 px-5 lg:px-0 w-full lg:w-4/5 mx-auto">
                        <Stepper steps={steps} currentStep={currentStep} />
                    </div>
                    <div className="mx-auto rounded-2xl bg-white pb-2 shadow-xl md:w-4/5">
                        {/* Stepper */}
                        <div className="horizontal container mt-5 ">

                            <div className="my-10 p-10 ">
                                <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
                            </div>
                        </div>

                        {/* navigation button */}
                        {currentStep !== steps.length && (
                            <StepperControl
                                handleClick={handleClick}
                                currentStep={currentStep}
                                steps={steps}
                            />
                        )}
                    </div>


                </div>
            </div>
        </div>
    );
};

export default CreateAccount;