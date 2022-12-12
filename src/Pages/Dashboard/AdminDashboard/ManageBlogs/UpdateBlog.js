import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

    
  


const UpdateBlog = ({refresh, setRefresh}) => {
    const {id}=useParams()
    const { register, handleSubmit } = useForm();
    const [btnSpinner ,setBtnSpinner]=useState(false)
    const date = new Date().toLocaleDateString()
    const navigate= useNavigate();
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
                    const picture=result.data.url;
                    const blogData= {title,category,description,picture,date}
                    const url = `https://online-bank-of-bd-server-production.up.railway.app/blog/${id}`
                    fetch(url,{
                        method:"PUT",
                        headers:{
                            "content-type":"application/json"
                        },
                        body:JSON.stringify(blogData)
                    }).then(res=>res.json()).then(result=>{
                        if(result.modifiedCount>0){
                            toast.success("Successfully Update Blog Post!");
                            navigate("/cpanel/manageBlogs")
                        }
                    })
                }
            })
            
        }
        return (
            <div
           
            className=" w-full max-h-screen flex justify-center">
                <div className=" md:w-2/3 w-full  my-12 md:mx-2 mx-4  flex flex-col items-center justify-center bg-white md:p-4 p-2 rounded-md shadow-3xl">
                    <div className='w-full'>
                        <button
                        onClick={()=>navigate(-1)}
                        className='text-gray-500 hover:text-green-500 '>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                            </svg>
                        </button>
                    </div>
                    <div className='max-h-[500px] overflow-y-scroll md:p-6 p-2 w-full'>
                        <h2 className="font-bold text-4xl text-center text-gray-700 my-5">
                            Edit Blog
                        </h2>
                        <form className="grid grid-cols-1 gap-4"
                            onSubmit={handleSubmit(onSubmit)}>
                            <input
                                {...register("title", { required: true, maxLength: 200 })}
                                className="border-2 border-gray-500 rounded mb-2 py-3 px-5"
                                placeholder="Add Title"
                                required
                            />
                            
                            <select 
                            {...register("category")}
                            className="border-2 border-gray-500 rounded mb-2 py-3 px-5">
                               <option>Personal blogs</option>
                                <option>Business/corporate blogs</option>
                                <option>News Blogs</option>
                                <option>Review Blogs</option>
                            </select>
                            <input
                                type="file"
                                {...register("picture",{ required: true })}
                                // onChange={handleFileUploader}
                                className="border-2 border-gray-500 rounded mb-2 py-3 px-5"
                                required
                            />
                            <textarea
                                className="h-48 border-2 border-gray-500 rounded mb-2 py-3 px-5 "
                                {...register("description",{ required: true, minLength: 50 })}
                                placeholder="Add Text Here (Minimum Character 100) "
                                required
                            />
                            <button
                            disabled={btnSpinner&& true}
                                className={`px-4 py-4 my-2 bg-green-700 rounded-lg text-sm md:text-xl   transition text-white ${btnSpinner? 'bg-gray-400 cursor-not-allowed':"bg-green-700 cursor-pointer hover:bg-green-400"}`}
                                type="submit"
                            >Edit Blog</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
    

export default UpdateBlog;