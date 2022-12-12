import React, { useEffect, useState } from 'react';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../Blogs/Blogs.css"
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../Components/Components.Nahid/Loading';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from "../../firebase.init";
import BlogComment from './BlogComment';
const BlogsDetails = () => {
    const {id}=useParams()
    const [blog,setblog]=useState({})
    const [spinner,setSpinner]=useState(true);
    const navigate = useNavigate()
    const [user, loading] = useAuthState(auth);
    const [refresh,setRefresh]=useState(false)
    const [btnSpinner,setBtnSpinner]=useState(false);
    const [comments,setComments]=useState(null);
    const date = new Date().toLocaleString()
    useEffect(()=>{
        const url= `https://online-bank-of-bd-server-production.up.railway.app/blog/${id}`
        fetch(url).then(res=>res.json()).then(data=>{
            setblog(data)
            setSpinner(false)
            const comment = data?.comment
           setComments(comment.reverse())
        })
    },[id,refresh])
    if(spinner || loading){
        return<Loading/>
    }

    const handleComment=(e)=>{
        e.preventDefault()
        setBtnSpinner(true)
        const userEmail = user?.email;
        const userName= user?.displayName;
        const userImage = user?.photoURL;
        const comment  =e.target.comment.value;
        const prevComment = blog?.comment;
        const commentDate = date;
        const userComment = [...prevComment,{comment, userEmail,userName,userImage,commentDate}];
        const url = `https://online-bank-of-bd-server-production.up.railway.app/blog/comment/${id}`;
        fetch(url,{
            method:"PATCH",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(userComment)
        }).then(res=>res.json()).then(result=>{
            setRefresh(!refresh)
            e.target.reset()
            setBtnSpinner(false)
        })
    }
    return (
        <section className='w-full mx-auto pb-5 max-w-7xl  mb-5  justify-center rounded-[27px] relative'>
        <div className='blogDetailsBanner'>
        </div>
        <div className="bg-base-100 shadow-xl mt-[80px] mx-auto max-w-[1280px] p-4 ">
           
            <div className="  text-center text-gray-700 my-5">
                <h2 className="font-bold text-4xl my-2">
                    {blog.category? blog.category: "Category"}
                </h2>
                    <div className="card-actions  text-black flex justify-center ">
                        <FontAwesomeIcon icon={faHeart} className="mr-2 hover:text-red-500 cursor-pointer" />
                        <FontAwesomeIcon icon={faShare} className="hover:text-green-500 cursor-pointer" />
                    </div>
                    <div>
                        <h2 className='text-center text-2xl tracking-wide '>{blog.date}</h2>
                    </div>
                    <div className='flex justify-start'>
                        <button 
                        onClick={()=>navigate(-1)}
                        style={{backgroundImage: "linear-gradient( to right,  rgba(39, 227, 117, 0.91),rgba(12, 160, 78, 0.944))"}}
                        className='py-2 px-4 text-xl  flex items-center text-white rounded-lg duration-300 ease-in-out hover:bg-[rgba(39, 227, 117, 0.91)]'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                            </svg>
                            Go Home</button>
                    </div>
                    <div className='blog-descriptio md:mx-12 mx-2 mt-[80px] flex flex-col justify-start'>
                        <h4 className='md:text-4xl text-xl font-medium text-start '>{blog?.title}</h4>
                        <hr/>
                        <blockquote className='mt-4'>
                            <p className='text-justify text-[15px]'>
                                {blog?.description}
                            </p>
                        </blockquote>

                        
                    </div>
                    <div className='comment-section mt-8'>
                        <form 
                        onSubmit={handleComment}
                        className='w-full flex flex-col items-start md:mx-12 mx-2'>
                            <input type="text"
                            name='comment'
                            style={{outline:"none"}}
                            required placeholder='Write Your Comment' className=" md:w-2/3  w-full outline-none border-b-2 border-t-0 border-l-0 border-r-0 
                            focus:border-t-0
                            focus:border-r-0
                            focus:border-l-0
                            focus:outline-none
                            "/>
                            <button
                            disabled={btnSpinner&& true}
                            className={`outline-0 mt-4 border py-2 px-4 rounded-md  text-white flex items-center text-xl font-sans font-medium shadow-md ${btnSpinner? 'bg-gray-400 cursor-not-allowed':'bg-green-500 cursor-pointer'}}`}>Comment</button>
                        </form>
                        <div className='my-4 md:mx-12 mx-4'>
                            <hr/>
                        </div>

                        {/* user comment  */}
                      {comments && comments.map((comment,index)=><BlogComment key={index} comment={comment}/>)   }
            </div>
                
            </div>
            
        </div>
            <div className='blog-img-container'>
                <figure><img className='blog-img shadow-xl' src={blog?.picture} alt="Shoes" /></figure>
            </div>
           
           
        </section>
    );
};

export default BlogsDetails;