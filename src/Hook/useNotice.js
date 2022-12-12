
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

const useNotice=()=>{
    const [allNotice,setAllNotice]=useState([]);
    const [smSpinner,setSmSpinner]=useState(true);
    useEffect(() => {
        fetch('https://online-bank-of-bd-server-production.up.railway.app/allNotice')
            .then(res => res.json())
            .then(data => {
                const dataReverse = data.reverse()
                setAllNotice(dataReverse);
                setSmSpinner(false);
            })
    }, [])
    if(smSpinner){
        return <HashLoader color="#137c38" size={70} cssOverride />
    }
return {allNotice}
}
export default useNotice;