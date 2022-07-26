import React from 'react';

const AboutBank = () => {
    return (
        <div className='max-w-7xl py-20 mx-auto'>
            <div className="p-5 md:p-10">
                <div className="flex flex-col items-center w-full justify-around md:flex-row gap-5">
                    <div className="w-3/5 mx-auto">
                        <p className="text-justify">
                            Founded in 1995, Online Bank of Bangladesh Ltd. (OBBD) is the country’s leading value-added financial institution based on Shariah' Principles. OBBD comprises of OBBD Securities Ltd, OBBD Investment Ltd, OBBD Foundation Hospital. The three-tier banking model (Formal, Non-formal & Voluntary), the first of its kind in the banking arena of Bangladesh, brings a new dynamism in welfare banking targeting eradication of poverty of the country with a motto of “Working Together for a Caring Society”. Working closely with our valued clients and stakeholders to provide them one-stop services, access to the very latest products using technology. Our unrivaled customer services has made us unparalleled in the industry. We build a long-term business partnership with our clients helping them grow profitable.
                        </p>

                    </div>
                    <div className="w-2/5 mx-auto relative">
                        <img src="https://i.ibb.co/5BS5hRy/pexels-negative-space-34577-1.png" alt="" className="object-cover  w-72 h-60  z-10 relative rounded-2xl" />
                        <img src="https://i.ibb.co/cDdxx5M/Rectangle-43.png" alt="" className="object-cover absolute -bottom-16 right-20 z-0 rounded-xl p-5" />

                    </div>
                </div>
            </div>
            <div className="p-5 md:p-10">
                <div className="flex flex-col items-center w-full justify-around md:flex-row gap-5">
                    <div className="w-2/5 mx-auto relative">
                        <img src="https://www.worldfirst.com/app/uploads/2020/11/Details-759x500.jpg" alt="" className="object-cover w-72 h-60 z-10 relative rounded-2xl" />
                        <img src="https://i.ibb.co/cDdxx5M/Rectangle-43.png" alt="" className="object-cover absolute -bottom-16 right-20 z-0 rounded-xl p-5" />

                    </div>

                    <div className="w-3/5 mx-auto">
                        <p className="text-justify">
                        The strong conviction to create a caring society is the cornerstone of SIBL’s all activities. We feel a strong affinity to the emotions of people. We believe that only banking activities can’t usher our society to a just and equitable stage. Thus we are extensively engaged in CSR activities on humanitarian grounds. We work in the fields such as from poverty eradication to family empowerment. Unlike others, the Bank’s criteria for success are not only the key objective to make profit but also landmarks to become the country’s most humanitarian and complete Bank.</p>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default AboutBank;