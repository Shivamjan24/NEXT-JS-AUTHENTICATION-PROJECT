import {start} from "@/dbconnect/connect";
import { NextRequest, NextResponse } from "next/server";
import users from "@/models/usermodel"

start()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token);
        const userr = await users.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})

        if(!userr){
            console.log("nhi ho raha")
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        userr.isVerfied=true
        userr.verifyToken=undefined
        userr.verifyTokenExpiry=undefined
        await userr.save();

        const response=NextResponse.json({
            message: "User verified successfully",
            success: true,
            data:userr.username
        })
        console.log(userr)
        return response;

    }
    catch (error) {
        return NextResponse.json({
            message:"unable to verify this user",
            success:false
        })
    }
    
}
