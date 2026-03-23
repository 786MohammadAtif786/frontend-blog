import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function PublicRoute({ children }) {

 const [user,setUser] = useState(null);
 const [loading,setLoading] = useState(true);
    const API = import.meta.env.VITE_API_URL;

 useEffect(()=>{

  const checkUser = async ()=>{

   try{

    const res = await axios.get(
     `${API}/api/v1/me`,
     {withCredentials:true}
    );

    setUser(res.data.user);

   }catch(err){
    setUser(null);
   }finally{
    setLoading(false);
   }

  }

  checkUser();

 },[]);

 if(loading) return <p>Loading...</p>;

 if(user){
  return <Navigate to="/" />
 }

 return children;

}