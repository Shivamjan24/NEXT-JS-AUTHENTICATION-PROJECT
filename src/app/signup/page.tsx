"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";


export default function Signup(){
    
    const router=useRouter();
    const [user,setuser]=React.useState({
        username:"",
        email:"",
        password:""
    })
    const [disabled,setdisabled]=useState(true)
    const [proces,setproces]=useState(false)
    let load:any;
    const signupp = async ()=>{
        try {
            load=toast.loading("Signing up");
            setproces(true)
            const response = await axios.post("/api/users/signup", user);
            toast.dismiss(load);
            console.log("Signup success", response.data);
            toast.success("Signup success");
            setuser({
                username:"",
                email:"",
                password:""
            })
            setproces(false)
            router.push("/login");
            
        } catch (error:any) {
            console.log("Signup failed", error.message);
            toast.dismiss(load);
            toast.error("Email already in use, please use another email id");
            setuser({
                username:"",
                email:"",
                password:""
            })
        }
        finally{
            setproces(false)
        }
    }
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setdisabled(false);
        } else {
            setdisabled(true);
        }
    }, [user]);

    return(
        <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl mt-10 mb-6">{proces ? "PROCESSING" : "SIGNUP PAGE"}</h1>
                <br/>
                <label className="mx-4" htmlFor="username">USERNAME</label>
                <input className="rounded-md p-2 my-2 text-black" type="text" value={user.username} id="username" name="username" onChange={(e) => setuser({...user, username: e.target.value})} placeholder="username"/>
                <br/>
                
                <label className="mx-4" htmlFor="email">EMAIL</label>
                <input className="rounded-md p-2 my-2 text-black" type="text" value={user.email} id="email" name="email" onChange={(e) => setuser({...user, email: e.target.value})} placeholder="email"/>
                <br/>

                <label className="mx-4" htmlFor="password">PASSWORD</label>
                <input className="rounded-md p-2 my-2 text-black" type="password" value={user.password} id="password" name="password" onChange={(e) => setuser({...user, password: e.target.value})} placeholder="password"/>
                <br/>

                <button className="bg-orange-700 text-black rounded-lg p-2 font-bold mt-5" onClick={signupp}>{disabled ? "NO SIGNUP" : "SIGNUP HERE"}</button>

                <div className="mt-6"> 
                    <Link href="/login">GO TO LOGIN PAGE</Link>
                </div>  
        </div>
    )
}