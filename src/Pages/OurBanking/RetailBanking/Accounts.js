import React from 'react';
import { Link } from 'react-router-dom';
import { accountsCard } from '../../../Components/Components.Shuvo/SData'

const Accounts = () => {
    return (
        <div className='bg-slate-200 pb-10'>
            <div className='mx-40 font-semibold'>
                <p>When you consider the advantages that come with a NRBCB account, coupled with the support and guidance you receive from your Relationship Manager, you would be right to consider it a valuable business asset.</p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 my-10'>
                {accountsCard.map(card =>
                    <Link to={card.href}>
                        <div className='mt-10 text-red-600 mx-40 gap-5'>
                            <div className="w-44 lg:w-72 mx-auto border border-red-600">
                                <div className="card-body items-center">
                                    <div className="justify-center">
                                        <img src={card.imageURL} alt="" />
                                    </div>
                                    <p className='font-semibold'>{card.text}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                )}
            </div>



        </div>
    );
};

export default Accounts;