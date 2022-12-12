import { useEffect, useState } from 'react';

const UseToken = (user) => {
    const [token, setToken] = useState('');
    useEffect( () => {
        const email = user?.user?.email;
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        const currentUser = {
            email:  email,
            joiningDate: date
        }
        if(email){
            fetch(`https://online-bank-of-bd-server-production.up.railway.app/user/${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
            .then(res => res.json())
            .then(data => {
                const accessToken = data.accessToken;
                localStorage.setItem('accessToken', accessToken);
                setToken(accessToken);
            })
        }

    }, [user]);
    return [token];
};

export default UseToken;