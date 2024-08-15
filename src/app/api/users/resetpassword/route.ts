import {start} from "@/dbconnect/connect";
import { NextRequest, NextResponse } from "next/server";
import users from "@/models/usermodel";
import bcryptjs from "bcryptjs";

start()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {token,password} = reqBody
        console.log(token);
        const userr = await users.findOne({forgotPasswordToken:token,forgotPasswordTokenExpiry:{$gt:Date.now()}})

        if(!userr){
            console.log("nhi ho raha")
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        const salt=await bcryptjs.genSalt(10);
        const hashedpswrd=await bcryptjs.hash(password,salt);

        userr.forgotPasswordToken=undefined;
        userr.forgotPasswordTokenExpiry=undefined;
        userr.password=hashedpswrd;
        await userr.save();

        const response=NextResponse.json({
            message: "password changed successfully",
            success: true,
            data:userr.username
        })
        console.log(userr)
        return response;

    }
    catch (error) {
        return NextResponse.json({
            message:"unable to change password",
            success:false
        })
    }
    
}
