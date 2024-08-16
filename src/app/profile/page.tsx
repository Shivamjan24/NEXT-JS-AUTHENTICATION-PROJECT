"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import React,{useState,useEffect} from "react";

import toast from 'react-hot-toast';


const profile = () =>{
    const [user,setuser]=useState("no info right now")
    const [info,setinfo]=useState(false)
    const router=useRouter()
    
    const logout = async () =>{
        try{
            await axios.get("/api/users/logout")
            router.push("/login")
        }
        catch(error){
            console.log(error)
        }
    }

    const getinfo = async ()=>{
        try 
        {
            const load=toast.loading("Retrieving info");
            const response = await axios.get("/api/users/getuser");
            toast.dismiss(load)
            setuser(response.data.data.username);
            setinfo(true);
            toast.success("Successfully retrieved user info!!!");
        } 
        catch (error:any) 
        {
            console.log(error.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <span className="font-bold text-4xl">PROFILE PAGE</span>
            <div className="mx-auto font-bold text-2xl mt-28">
                <button className="bg-blue-700 text-white hover:bg-white hover:text-blue-700 rounded-lg px-4 py-2" onClick={logout}> LOGOUT </button>
            </div>
            <br/>
            <div className="mx-auto font-bold text-2xl mt-10">
                <button className="bg-green-700 text-white hover:bg-white hover:text-green-700 rounded-lg px-4 py-2 mb-10" onClick={getinfo}> GET USER INFO </button>
                <div>WELCOME</div><h1 className="bg-orange-600 text-white hover:bg-white hover:text-orange-600 rounded-lg px-4 py-2 mb-10"> {user} </h1>
            </div>
            
        </div>
    )
}

export default profile;