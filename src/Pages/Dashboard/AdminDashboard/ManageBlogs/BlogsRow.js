import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const BlogsRow = ({blog,index,setRefresh,refresh}) => {
    const {title,picture,description,date, _id}=blog
    const navigate =useNavigate()
    const handleDeleteBlog=(id)=>{
        const confirm =window.confirm("Are You Sure Delete This Blog!")
        if(confirm){
            const url = `https://online-bank-of-bd-server-production.up.railway.app/blog/${id}`
            fetch(url,{
                method:"DELETE"
            }).then(res=>res.json()).then(result=>{
                // console.log(result);
                toast.success("Successfully Delete Blog post!")
                setRefresh(!refresh)
            })
        }
    }
    return (
        <tr title={description} className=" lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td className="w-full lg:w-auto p-2 text-sm  text-center border border-b block font-semibold lg:table-cell relative lg:static">
                {index}
            </td>
            <td className="w-full lg:w-auto p-2 text-sm  text-center border border-b block lg:table-cell relative lg:static">
            <img src={picture} alt="blog-img" className='h-12 rounded-xl'/>
            </td>
            <td className="w-full lg:w-auto p-2 text-sm  text-start border border-b block lg:table-cell relative lg:static">
                <span className='text-md '>{title}</span>
            </td>
            <td className="w-full lg:w-auto p-2 text-sm  text-center border border-b block lg:table-cell relative lg:static">
            <span className='text-md'>{date}</span>
            </td>
            <td className="w-full lg:w-auto p-2 text-sm  text-center border border-b block lg:table-cell relative lg:static">
                <button
                onClick={()=>navigate(`/blog/${_id}`)}
                className="btn btn-xs btn-outline btn-primary">Update</button>
            </td>
            <td className="w-full lg:w-auto p-2 text-sm  text-center border border-b block lg:table-cell relative lg:static">
            <button
            onClick={()=>handleDeleteBlog(_id)}
            className="btn btn-xs btn-outline btn-secondary">Delete</button>
            </td>
    </tr>
    );
};

export default BlogsRow;