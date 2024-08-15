import {start} from "@/dbconnect/connect";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import users from "@/models/usermodel"
import { sendemail } from "@/helpers/sendemail";

start()

export async function POST(request:NextRequest){
    try {
        const {username, email, password} = await request.json()

        const userr = await users.findOne({email})

        if(userr){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }
        const salt=await bcryptjs.genSalt(10);
        const hashedpswrd=await bcryptjs.hash(password,salt);
        const newUser = new users({
            username,
            email,
            password: hashedpswrd
        })

        const savedUser = await newUser.save()
        console.log(savedUser);
        sendemail({email:savedUser.email,emailtype:"VERIFY",id:savedUser._id});
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    }
    catch (error) {
        return NextResponse.json({
            message:"unable to create this user",
            success:false
        })
    }
    
}
