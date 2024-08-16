"use client"
import axios from "axios";
import React,{useState,useEffect} from "react";
import toast from "react-hot-toast";

export default function Resetpassword(){
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(true);
    let load:any;

    const redirect = async () =>{
        try{
            load=toast.loading("Resetting password");
            const token=window.location.search.split("=")[1];
            const response=await axios.post("/api/users/resetpassword",{token:token,password:password})
            toast.dismiss(load);
            toast.success("Password reset successfully");
            console.log(response.data);
        }
        catch(error){
            console.log(error);
            toast.dismiss(load);
        }
    }

    useEffect(()=>{
        if(password!=="" && password===confirmPassword)
            setError(false);
        else
        setError(true);
    },[password,confirmPassword])

    return(
        <div className="flex flex-col items-center justify-center">
            <h1 className="font-bold text-xl mt-40 mb-5">ENTER NEW PASSWORD</h1>
            <input type="text" className="rounded-lg px-3 py-2 border-black text-black" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <h1 className="font-bold text-xl mt-10 mb-5">CONFIRM PASSWORD</h1>
            <input type="text" className="rounded-lg px-3 py-2 border-black text-black" placeholder="Renter Password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 mt-5 rounded-lg" onClick={redirect}>{error ? "PLEASE ENTER BOTH PASSWORD" : "SUBMIT"}</button>
        </div>
    )
}