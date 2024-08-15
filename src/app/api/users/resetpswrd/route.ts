import { sendemail } from "@/helpers/sendemail";
import users from "@/models/usermodel"
import { NextResponse,NextRequest } from "next/server";
import {start} from "@/dbconnect/connect"

start()


export async function POST(request:NextRequest){
    try 
    {
        const reqbody=await request.json();
        const {email}=reqbody;
        const user=await users.findOne({email:email})
        if(!user)
        {
            return NextResponse.json({message:"no user available with that email"});
        }
        const response = await sendemail({email:email,emailtype:"RESET",id:user._id});
        return NextResponse.json({message:"email sent successfully"});
    } 
    catch (error) 
    {
        return NextResponse.json({
            message:"unable to send email",
            success:false
        })
    }
}