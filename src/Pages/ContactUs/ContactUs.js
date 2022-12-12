import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Fade, Zoom } from 'react-reveal';
import Flash from 'react-reveal/Flash';
import RubberBand from 'react-reveal/RubberBand';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';
import PageTitle from '../PageTitle/PageTitle';



const ContactUs = () => {

    const [pending, setPending] = useState(false);
    const name = useRef('');
    const email = useRef('');
    const message = useRef('');
    const subject = useRef('');


    const sendEmail = (e) => {
        e.preventDefault();
        setPending(true);

        const name = e.target.name.value
        const email = e.target.email.value
        const message = e.target.message.value
        const subject = e.target.subject.value

        // console.log(name, email, message, subject)

        emailjs.sendForm('service_41xeu0y', 'template_zzunvbq', e.target, '8oCNQKe5LucpJto5h')
            .then((result) => {

                if (result.text) {
                    toast.success("Successfull", "You Send an Email!", "success");
                    e.target.reset();
                    setPending(false);
                }
            }, (error) => {
                Swal("OPPSS...", "Email not Send!", "error");
                setPending(false);
            });

        const userDetails = {
            name: name,
            email: email,
            message: message,
            subject: subject
        }
        // console.log(userDetails)

        fetch('https://online-bank-of-bd-server-production.up.railway.app/contact', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.acknowledged) {
                    toast.success('your details submited')
                }
                else {
                    toast.error('Something Wrong')
                }
            })


    };

    return (
        <section className='section max-w-7xl overflow-hidden mx-auto bg-slate-200 py-20 px-5' id='contact'>

            {/* title */}

            <PageTitle title="Contact Us"></PageTitle>

            {/* end */}



            <RubberBand>
                <div className='flex flex-col items-center text-center'>
                    <div className="title">
                        <h2 className="section-title text-center font-semibold text-2xl md:text-4xl lg:text-6xl ">
                            Contact <span className="text-green-700">US</span>
                        </h2>
                    </div>
                </div>
            </RubberBand>
            <div className='flex flex-col w-full lg:gap-8 lg:flex-row'  >
                <div className='flex flex-1 items-center flex-col lg:flex-row w-full space-y-8 mx-auto my-12 lg:mb-0 lg:pt-2' >

                    <div className="flex flex-col lg:flex-row w-full mx-auto">
                        <div className="flex flex-col gap-3 mx-auto w-full lg:w-2/6">
                            <div className='flex gap-3'>
                                <div className='text-accent rounded-sm w-14 h-14 flex items-start justify-center mt-2 mb-4 lg:mb-0 text-2xl'>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </div>
                                <Flash>
                                    <div>
                                        <h4 className='font-body text-xl mb-1'>Have a question?</h4>
                                        <p className='mb-1 text-paragraph'>I am here to help you.</p>
                                        <p className='mb-1 text-accent'>+880-1636-090316</p>
                                        <p className='text-accent font-normal '>Email us at - <br /> uniquecoders007@gmail.com</p>
                                    </div>
                                </Flash>
                            </div>
                            <div className='flex gap-3'>
                                <div className='text-accent rounded-sm w-14 h-14 flex items-start justify-center mt-2 mb-4 lg:mb-0 text-2xl'>
                                    <FontAwesomeIcon icon={faMapMarkedAlt} />
                                </div>
                                <Flash>
                                    <div>
                                        <h4 className='font-body text-xl mb-1'>Current Location</h4>
                                        <p className='mb-1 text-paragraph'>Uttara, Sector-7, Dhaka</p>
                                        <p className='text-accent font-normal '>Serving clients worldwide</p>
                                        <Fade left>
                                            <div className='flex justify-start py-3'>
                                                {/* Map */}

                                                <iframe title='map' className='w-full Ig:w-[180px] lg:h-[100px] rounded-md border mx-auto' id="gmap_canvas" src="https://maps.google.com/maps?q=uttarabangladesh&t=&z=13&ie=UTF8& iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                                            </div>
                                        </Fade>
                                        <a target="_blank" href='https://meet.google.com/egr-gxhw-oem' className='bg-secondary badge badge-lg text-white hover:bg-secondary-hover'>Live Support</a>

                                    </div>
                                </Flash>
                            </div>
                        </div>

                        <Zoom top>
                            <form onSubmit={sendEmail} className='space-y-8 w-full mx-auto lg:w-3/6' >
                                <div className='flex gap-8'>
                                    <input ref={name} required name='name' className='input w-full px-5' type='text' placeholder='Your name' />
                                    <input ref={email} required name='email' className='input w-full px-5' type='email' placeholder='Your email' />
                                </div>
                                <div className="">
                                    <input ref={subject} required name='subject' className='input w-full px-5' type='text' placeholder='Subject' />
                                </div>
                                <div className="">
                                    <textarea ref={message} required name='message' className='textarea w-full px-5 resize-none' placeholder='Your message'></textarea>
                                </div>
                                <input disabled={pending ? true : false} type='submit' value="Send Message" className='btn btn-lg bg-accent text-white hover:bg-secondary-hover' />
                            </form>
                        </Zoom>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default ContactUs;