// import { useEffect, useState } from "react";

// const useAdmin = (user)=>{
//     const [admin, setAdmin] = useState(false);
//     const [adminLoading, setAdminLoading] = useState(true);
//     const email = user?.email
//     useEffect(()=>{
//         const url= `https://online-bank-of-bd-server-production.up.railway.app/user/isAdmin/${email}`
//         fetch(url,{
//             method:"GET",
//             headers:{
//                 authorization: `bearer ${localStorage.getItem("accessToken")}`,
//             }    
//         }).then((res) => res.json())
//         .then((data) => {
//           setAdminLoading(false);
//           setAdmin(data.admin);
//         })
//     },[email])
  
//   return [admin, adminLoading];
// }