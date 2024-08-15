"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Console } from "console";

export default function login(){

    const [user, setuser] = useState({
        email:"",
        password:""
    });
    const router=useRouter()
    const [proces, setproces] = useState(false);
    const [disabl,setdisabl]=useState(true);
    const loginn = async () =>{
       try 
       {
            setproces(true);        
            const response=await axios.post("/api/users/login",user);
            console.log("Login success", response.data);
            router.push("/profile");
            setproces(false);
       } 
       catch (error) 
       {
            console.log("Login failed")
       }
    }

    useEffect(()=>{
        if(user.email!="" && user.password!="")
        setdisabl(false);
    },[user])

    return(
        <div className="flex flex-wrap">
            <div className="w-half m-auto rounded-md">
                <h1 className="text-4xl mt-10 mb-6 ml-20">{proces ? "PROCESSING" : "LOGIN PAGE"}</h1>
                <br/>
                
                <label className="mx-4" htmlFor="email">EMAIL</label>
                <input className="rounded-md p-2 my-3 text-black" type="text" id="email" name="email" value={user.email} onChange={(e) => setuser({...user, email: e.target.value})} placeholder="email"/>
                <br/>

                <label className="mx-4" htmlFor="password">PASSWORD</label>
                <input className="rounded-md p-2 my-3 text-black" type="text" id="password" name="password" value={user.password} onChange={(e) => setuser({...user, password: e.target.value})} placeholder="password"/>
                <br/>

                <button className="bg-orange-700 text-black rounded-lg p-2 font-bold ml-40 mt-10" onClick={loginn}>{disabl ? "NO LOGIN" : "LOGIN HERE"}</button>
                <br/>

                <div className="mt-6 ml-36"> 
                    <Link href="/signup">GO TO SIGNUP PAGE</Link>
                </div>
                <div className="mt-6 mx-auto"> 
                    <Link href="/resetpswrd">FORGOT PASSWORD? CLICK HERE TO RESET PASSWORD</Link>
                </div>  
            </div>
        </div>
    )
}