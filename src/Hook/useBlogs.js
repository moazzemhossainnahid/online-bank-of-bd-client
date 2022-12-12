import { useEffect, useState } from "react"

const useBlogs=()=>{
    const[blogData,setBlogDate]=useState([])
    const [spinner,setSpinner]=useState(true)
    useEffect(()=>{
        const url = "https://online-bank-of-bd-server-production.up.railway.app/blogs"
        fetch(url).then(res=>res.json()).then(data=>{
            const blogreverse= data.reverse()
            setBlogDate(blogreverse)
            setSpinner(false)
        })
    },[spinner])
    return{blogData,spinner}
}
export default useBlogs;