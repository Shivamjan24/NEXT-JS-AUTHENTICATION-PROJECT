import {start} from "@/dbconnect/connect";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import users from "@/models/usermodel"

start()

export async function POST(request:NextRequest){
    try {
        const {email, password} = await request.json()

        const userr = await users.findOne({email})

        if(!userr){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        const check=await bcryptjs.compare(password,userr.password)
        if(!check){
            return NextResponse.json({error: "Password is incorrect"}, {status: 400})
        }

        const tokenData = {
            id: userr._id,
            username: userr.username,
            email: userr.email
        }

        const token=jwt.sign(tokenData,process.env.JWT_SECRET!,{expiresIn:"1d"})
        
        const response=NextResponse.json({
            message:"Login successful",
            success:true
        })

        response.cookies.set("token",token,{
            httpOnly:true
        })
        
        
        return response;

    }
    catch (error) {
        return NextResponse.json({
            message:"unable to login this user",
            success:false
        })
    }
    
}
