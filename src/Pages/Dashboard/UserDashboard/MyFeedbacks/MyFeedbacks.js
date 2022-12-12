import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Components/Components.Nahid/Loading';
import MyFeedbackDetails from './MyFeedbackDetails';
import auth from '../../../../firebase.init';
import PageTitle from '../../../PageTitle/PageTitle';

const MyFeedbacks = () => {
    const [user] = useAuthState(auth);
    const email = user?.email;

    // console.log(email);

    const feedback = () => axios.get(`https://online-bank-of-bd-server-production.up.railway.app/feedbacks/${email}`);

    const { isLoading, data, refetch } = useQuery(["feedbacks"], feedback);

    const feedbacks = data?.data;
    if (isLoading) {
        return <Loading />;
    }

    // console.log("From React Query", feedbacks)

    return (

        feedbacks && <div className=" text-left h-full w-full">

            {/* title */}

            <PageTitle title="feedbacks"></PageTitle>

            {/* end */}



            <div className="w-full flex items-center justify-center my-12">
                <div className="bg-white shadow rounded py-12 px-8 mb-20">
                    <p className="md:text-3xl text-xl font-bold pb-10 leading-7 text-center text-gray-700">Total Feedbacks: {feedbacks?.length}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 mx-auto">
                        {
                            feedbacks?.map((feedback, index) => <MyFeedbackDetails feedback={feedback} refetch={refetch} index={index} />)
                        }
                    </div>
                </div>
            </div>
        </div >
    );
};

export default MyFeedbacks;