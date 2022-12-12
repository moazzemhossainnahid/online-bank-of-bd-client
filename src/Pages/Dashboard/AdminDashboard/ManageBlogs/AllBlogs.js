import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AddBlog from './AddBlog';
import BlogsRow from './BlogsRow';

const AllBlogs = () => {
    const [blogs,setBlogs]=useState([])
    const [smSpinner,setSmSpinner ]=useState(true)
    const [refresh,setRefresh]=useState(false)
    const [modal,setModal]=useState(false)
    const [searchBlogs,setSearchBlogs]=useState(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
      } = useForm();
    useEffect(()=>{
        const url = 'https://online-bank-of-bd-server-production.up.railway.app/blogs'
        fetch(url).then(res=>res.json()).then(data=>{
            const reversBlog = data.reverse()
            setBlogs(reversBlog)
            setSmSpinner(false)
        })
    },[refresh])
    if(smSpinner){
        return <p className='text-green text-xl my-12 text-center'>Loading...</p>
    }

    // search function 
    const isSearch=(data)=>{
        const search = data.search.toLowerCase()
        const searchBlog = blogs.filter(blog=>{
            return blog.title.toLowerCase().includes(search)
        })
        setSearchBlogs(searchBlog)
        
    }
    const getShowAllBlogs=()=>{
        setSearchBlogs(false)
        setRefresh(!refresh)
        reset()
    }
    return (
        <div className=" text-left h-full w-full">

        <div className="w-full flex items-center justify-center my-12">
            <div className="bg-base-100 shadow rounded py-12 px-4 mb-20  ">
                <div className='blogM-header grid md:grid-cols-3 grid-cols-1'>
                    <div className='add-btn flex items-center justify-between md:justify-start'>
                        <button
                        onClick={()=>setModal(true)}
                        className="outline-0 border md:py-2 py-1 md:px-4 px-2 text-white rounded-md bg-primary  flex items-center md:text-xl text-sm font-sans font-medium shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="md:h-6 md:w-6 w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            Add
                        </button>
                        <button
                        onClick={getShowAllBlogs}
                        className="outline-0 md:ml-2 ml-[2px] border md:py-2 py-1 md:px-4 px-2 rounded-md bg-primary flex items-center text-white md:text-xl  text-sm font-sans font-medium shadow-md">
                          Show All
                        </button>

                    </div>
                    <p className="md:text-3xl text-xl font-bold md:pb-10 pb-4 pt-6 md:pt-2 leading-7 text-center text-primary">All Blogs </p>
                    {/* search container  start */}
                    <div className='search-container flex items-center justify-center mb-4 md:mb-0'>
                        <form
                        onSubmit={handleSubmit(isSearch)}
                        className='w-full flex items-center justify-end'>
                            <input 
                             {...register("search", {
                                required: true,
                              })}
                            type="text" className='border-2  border-primary md:py-2   outline-0 focus:outline-0 text-primary md:text-md text-sm rounded-l-lg' placeholder="Search Blog Title"/>
                            <button type='submit' className=' bg-primary text-white py-2  md:px-4 px-2 text-sm md:text-xl  rounded-r-lg '>
                                <svg xmlns="http://www.w3.org/2000/svg" className="md:h-6 md:w-6 w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </form>
                       

                    </div>
                    <hr/>
                    {/* search container end  */}

                </div>
                        <table className="border-collapse w-full bg-netural ">
                            {/* <!-- head --> */}
                            <thead>
                                <tr className='text-center'>
                                    <th className="p-3 font-bold uppercase border border-gray-300  hidden lg:table-cell">Index</th>
                                    <th className="p-3 font-bold uppercase  border border-gray-300 hidden lg:table-cell">Image</th>
                                    <th className="p-3 font-bold uppercase  border border-gray-300 hidden lg:table-cell">Title</th>
                                    <th className="p-3 font-bold uppercase  border border-gray-300 hidden lg:table-cell">Date</th>
                                    <th className="p-3 font-bold uppercase  border border-gray-300 hidden lg:table-cell">Update</th>
                                    <th className="p-3 font-bold uppercase  border border-gray-300 hidden lg:table-cell">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                        {!searchBlogs &&
                            blogs?.map((blog,index)=><BlogsRow key={blog._id} blog={blog} index={index+1} refresh={refresh} setRefresh={setRefresh} />)
                        }
                        {
                            searchBlogs &&
                            searchBlogs.map((blog,index)=><BlogsRow key={blog._id} blog={blog} index={index+1} refresh={refresh} setRefresh={setRefresh} />)
                        }
                        </tbody>
                        </table>
            </div>

         

        </div>
        {
            modal && <AddBlog setModal={setModal} refresh={refresh} setRefresh={setRefresh}/>
        }
        </div>
    );
};

export default AllBlogs;