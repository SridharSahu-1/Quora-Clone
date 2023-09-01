import React, { useState,useEffect } from 'react'
import { auth } from "../../firebase";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}) {

    const [isLoading,setIsLoading] = useState(true);
    const [isLoggedIn,setIsLoggedIn] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user)=>{
            if (user){
                setIsLoggedIn(true); 
                setIsLoading(false)}
            else {
                setIsLoggedIn(false);
                setIsLoading(false);
            }
        })
    },[auth.currentUser])

    if(isLoading){
        return <div></div>
    }
    if(!isLoggedIn){
        return <Navigate to={"/login"}/>
    }

  return children;
}
