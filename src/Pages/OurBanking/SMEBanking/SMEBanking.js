import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../PageTitle/PageTitle";

const SMEBanking = () => {
    const [smeLoans, setSmeLoans] = useState([]);


    useEffect(() => {
        fetch('https://online-bank-of-bd-server-production.up.railway.app/smebanking')
            .then(res => res.json())
            .then(data => setSmeLoans(data))
    }, [])


    const navigate = useNavigate();

    const handleBtnUpdate = id => {
        navigate('/smebanking/' + id)

    }


    return (
        <div className='max-w-7xl mx-auto'>

            {/* title */}

            <PageTitle title="SMEBanking"></PageTitle>

            {/* end */}



            <div className='flex flex-col bg-slate-100 md:flex-row gap-2 justify-around items-center py-10 px-2' data-aos="fade-down">

                <div className="text-left">
                    <h2 className="text-3xl font-bold">Grow Your Business</h2>
                    <h3 className="text-2xl">With our quick & simplified</h3>
                    <h3 className="text-2xl font-bold">SME FINANCING</h3>

                </div>

                <div className="">
                    <img className='object-cover' src="https://i.ibb.co/VVmbh6x/istockphoto-1172696274-612x612-removebg-preview.png" alt="" />
                </div>


            </div>


            <div className='grid grid-cols-1 lg:grid-cols-4 pt-8 gap-5 bg-slate-100 px-8 pb-10' data-aos="zoom-in-down">

                {
                    smeLoans.map(smeLoan => <div key={smeLoan._id} className="card card-compact max-w-max bg-base-100 shadow-xl">
                        <figure><img src={smeLoan.loan_img} alt="sme loan img" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{smeLoan.loan_name} </h2>
                            <p className='text-left'>{smeLoan.loan_description}</p>
                            <div className="card-actions justify-end">
                                <button onClick={() => handleBtnUpdate(smeLoan._id)} className='btn btn-xs bg-green-700 border-0'>Loan Now</button>

                            </div>
                        </div>
                    </div>
                    )
                }

            </div>


        </div>
    );
};

export default SMEBanking;