import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
const NewNotice = ({setModal}) => {
    const { register, handleSubmit,reset } = useForm();
    const [btnSpinner,setBtnSpinner]=useState(false);
    const date = new Date().toLocaleString();

    const onSubmit=(data)=>{
        setBtnSpinner(true)
        const newNotice = {
            readUsers:[],
            title:data.title,
            message:data.message,
            noticeDate: date
        };
        const url = `https://online-bank-of-bd-server-production.up.railway.app/notice`;
        fetch(url,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(newNotice)
        })
        .then(res=>res.json())
        .then(result=>{
            setBtnSpinner(false);
            setModal(false);
            toast.success("Successfully posted New Notice!")
            reset();
        })
    }
    return (
        <div
        style={{backgroundColor:"rgba(000,000,000,0.6)"}}
        className=" mx-5 absolute top-0 right-0 left-0 bottom-0 z-30 flex justify-center ">
            <div className=" md:w-2/3 w-full  my-12 md:mx-2 mx-4  relative  shadow-xl flex flex-col items-center justify-center bg-base-100 md:p-4 p-2 rounded-md shadow-3xl">
                    <span
                    onClick={()=>setModal(false)}
                    className='p-2  rounded-full absolute top-4 right-4  bg-base-200 md:mr-[-10px] md:mt-[-10px] md:mb-[10px] mr-0 cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 hover:text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </span>
                    <div className='max-h-[500px] overflow-y-scroll md:p-6 p-2 w-full'>
                    <h2 className="font-bold text-4xl text-center  my-5">
                        New Notice
                    </h2>
                    <form className="grid grid-cols-1 gap-4 bg-base-100"
                        onSubmit={handleSubmit(onSubmit)}>
                        <input
                            {...register("title", { required: true, maxLength: 200 })}
                            className="border-2 border-gray-500 rounded mb-2 py-3 px-5 bg-transparent"
                            placeholder="Add Title"
                            required
                        />
                        <textarea
                            className="h-48 border-2 border-gray-500 rounded mb-2 py-3 px-5  bg-transparent"
                            {...register("message",{ required: true, minLength: 50 })}
                            placeholder="Add Text Here (Minimum Character 100) "
                            required
                        />
                        <button
                        disabled={btnSpinner&& true}
                            className={`px-4 py-4 my-2 bg-primary rounded-lg text-sm md:text-xl   transition  text-white ${btnSpinner? 'bg-gray-400 cursor-not-allowed loading':" cursor-pointer :bg-primary"}`}
                            type="submit"
                        >
                            {
                                btnSpinner? "Loading...": "Add Now"
                            }
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};
export default NewNotice;