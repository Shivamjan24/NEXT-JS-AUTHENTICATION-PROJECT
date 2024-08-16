"use client"
import React,{useState,useEffect} from "react";
import axios from "axios";
import toast from "react-hot-toast"


export default function resetpswrd(){
    const [email,setemail]=useState("")
    const [disabl,setdisabl]=useState(true);

    const redirect = async () =>{
        try 
        {
            const load=toast.loading("sending email");
            const response=await axios.post("/api/users/resetpswrd",{email});
            toast.dismiss(load);
            toast.success("Email sent successfully");
            console.log(response.data);
        } 
        catch (error) 
        {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(email==="")
            setdisabl(true)
        else
            setdisabl(false)
    },[email])

    return(
        <div className="flex flex-col items-center justify-center">
            <h1 className="mt-20 text-3xl font-bold mb-4">Reset Password</h1>
            <label className="mx-4" htmlFor="email">EMAIL</label>
            <input className="rounded-md p-2 my-3 text-black" type="text" id="email" name="email"  placeholder="email" value={email} onChange={(e)=>{setemail(e.target.value)}}/>

            <button className="bg-orange-700 text-black rounded-lg p-2 font-bold mt-10" onClick={redirect}>{disabl ? "PLEASE ENTER EMAIL" : "SUBMIT"}</button>
        </div>
    )
}