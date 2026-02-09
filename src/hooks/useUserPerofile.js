import React,{useEffect, useState} from 'react'
import axios from 'axios'
function useUserPerofile() {
    const [userData,setUserData] = useState({})
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(null)
    useEffect(()=>{
        const token = localStorage.getItem("access_token")
        axios.get("http://127.0.0.1:8000/auth/user/",{ headers: { Authorization: `Bearer ${token}` } })
        .then((response)=>{
            setUserData(response.data)
        })
        .catch((err)=>{
            setError(err)
        })
        .finally(()=>{
            setLoading(false)
        })
    },[])
    return {userData,loading,error}
 
}

export default useUserPerofile