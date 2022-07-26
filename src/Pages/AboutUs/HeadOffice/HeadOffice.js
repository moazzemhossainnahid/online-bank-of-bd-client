import React from 'react';
import PageTitle from '../../PageTitle/PageTitle';

const HeadOffice = () => {
    return (
        <div className=''>
            {/* title */}

            <PageTitle title="HeadOffice"></PageTitle>

            {/* end */}


            <div className="hero py-20 bg-slate-100 max-w-7xl mx-auto">
                <div className="hero-content flex-col lg:flex-row">
                    <img src="https://i.ibb.co/nDVy4qR/png-clipart-bank-ezy-tax-solutions-public-accountant-registered-tax-agent-bank-building-payment-remo.png" className="max-w-sm rounded-lg" alt="online Bank BD Img" />
                    <div>
                        <h1 className="text-5xl font-bold">Head <span className="text-green-700">Office</span> </h1>
                        <address className='font-bold text-2xl'>
                            Online Bank BD,<br />
                            Plot# 14, Bir Uttam A. K. Khandaker Road,<br />
                            Block# C, Gulshan-1,<br />
                            Dhaka, Bangladesh. <br />
                            Phone: +880 1785748248 <br />
                            Email: uniquecoders007@gmail.com

                        </address>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeadOffice;