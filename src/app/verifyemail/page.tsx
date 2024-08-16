"use client"
import axios from "axios"
import Link from "next/link"
import React,{useState,useEffect} from "react"
import toast from "react-hot-toast"


export default function verifyemail(){

    const [user,setuser]=useState("")
    const [isverified,setverified]=useState(false)
    let load:any;

    const verify = async ()=>{
        try{
            load=toast.loading("Verifying user")
            const token=window.location.search.split("=")[1]
            const response=await axios.post("/api/users/verifyemail",{token})
            toast.dismiss(load);
            toast.success("User verified successfully!!!")
            setuser(response.data.data)
            setverified(true)
        }
        catch(error){
            console.log(error)
            toast.dismiss(load);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="mt-40">
                EMAIL VERIFICATION PAGE
            </div>
            <div className="my-10">
                <button onClick={verify} className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 my-5 rounded-md">CLICK HERE TO VERIFY</button>
                {isverified ? (<div className="bg-green-600 text-white px-3 py-2 rounded-lg"> USER VERIFIED ${user}</div>) : (<div className="bg-red-600 text-black px-3 py-2 rounded-lg">USER UNVERIFIED</div>)}
            </div>
            <div className="bg-green-600 text-white px-3 py-2 rounded-lg"> 
                <Link href="/login">GO TO LOGIN PAGE</Link>
            </div> 
        </div>
    )
}