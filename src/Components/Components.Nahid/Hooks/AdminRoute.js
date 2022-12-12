import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const AdminRoute = () => {
    const [admin, setAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);
    const [user] = useAuthState(auth);
 
    useEffect(() => {
        const email = user?.email;
        fetch(`https://online-bank-of-bd-server-production.up.railway.app/user/admin/${email}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setAdmin(data.admin);
            setAdminLoading(false);
          });
      }, [user]);
    
      return [admin, adminLoading];
};

export default AdminRoute;