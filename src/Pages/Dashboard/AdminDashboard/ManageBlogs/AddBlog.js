import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
const AddBlog = ({refresh, setRefresh, setModal}) => {
    const { register, handleSubmit,reset,watch } = useForm();
    const [btnSpinner ,setBtnSpinner]=useState(false)
    const date = new Date().toLocaleDateString()
    const imageAPIKey = 'f2d532c88848782b1dc45cebfdcd0290';

    const onSubmit = (data) => {
        setBtnSpinner(true)
        const image =data.picture[0]
        const formData = new FormData()
        formData.append("image",image)
        const imgUrl = `https://api.imgbb.com/1/upload?key=${imageAPIKey}`;

        fetch(imgUrl,{
            method:"POST",
            body:formData
        })
        .then(res=>{
            if(!res.status === 200){
                setBtnSpinner(false)
            }
            return res.json()
        })
        .then(result=>{
            
            if(result.success){
                const title = data.title;
                const category = data.category;
                const description = data.description;
                const picture=result.data.url
                const comment =[]
                const blogData= {title,category,description,picture,date,comment}
                // console.log(blogData);
                const url = 'https://online-bank-of-bd-server-production.up.railway.app/blog';
                fetch(url,{
                    method:"POST",
                    headers:{
                        "content-type":"application/json"
                    },
                    body:JSON.stringify(blogData)
                }).then(res=>res.json()).then(result=>{
                    toast.success("Successfully Your Blog Post!")
                    reset()
                    setModal(false)
                    setBtnSpinner(false)
                    setRefresh(!refresh)
                })
            }
        })
        
    }
    return (
        <div
        style={{backgroundColor:"rgba(000,000,000,0.6)"}}
        className=" mx-5 absolute top-0 right-0 left-0 bottom-0 z-30 flex justify-center">
            <div className=" md:w-2/3 w-full  my-12 md:mx-2 mx-4  flex flex-col items-center justify-center bg-base-100 md:p-4 p-2 rounded-md shadow-3xl">
                <div className='cross-btn flex justify-end w-full'>
                    <span
                    onClick={()=>setModal(false)}
                    className='p-2 rounded-full bg-base-200 md:mr-[-10px] md:mt-[-10px] md:mb-[10px] mr-0 cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 hover:text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </span>
            </div>
                <div className='max-h-[500px] overflow-y-scroll md:p-6 p-2 w-full'>
                    <h2 className="font-bold text-4xl text-center  my-5">
                        Add a Blog
                    </h2>
                    <form className="grid grid-cols-1 gap-4 bg-base-100"
                        onSubmit={handleSubmit(onSubmit)}>
                        <input
                            {...register("title", { required: true, maxLength: 200 })}
                            className="border-2 border-gray-500 rounded mb-2 py-3 px-5 bg-transparent"
                            placeholder="Add Title"
                            required
                        />
                        
                        <select 
                        {...register("category")}
                        className="border-2 border-gray-500 rounded mb-2 py-3 px-5 bg-transparent">
                            <option>Personal blogs</option>
                            <option>Business/corporate blogs</option>
                            <option>News Blogs</option>
                            <option>Review Blogs</option>
                        </select>
                        <input
                            type="file"
                            {...register("picture",{ required: true })}
                            className="border-2 border-gray-500 rounded mb-2 py-3 px-5 bg-transparent"
                            required
                        />
                        <textarea
                            className="h-48 border-2 border-gray-500 rounded mb-2 py-3 px-5  bg-transparent"
                            {...register("description",{ required: true, minLength: 50 })}
                            placeholder="Add Text Here (Minimum Character 100) "
                            required
                        />
                        <button
                        disabled={btnSpinner&& true}
                            className={`px-4 py-4 my-2 bg-green-700 rounded-lg text-sm md:text-xl   transition  text-white ${btnSpinner? 'bg-gray-400 cursor-not-allowed loading':"bg-green-700 cursor-pointer hover:bg-green-400"}`}
                            type="submit"
                        >Add Blog</button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default AddBlog;