import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export default async function getdatafromtoken(request:NextRequest){
    try 
    {
        const token=request.cookies.get("token")?.value || "";
        const decoded=await jwt.verify(token,process.env.JWT_SECRET!)
        console.log(decoded)
        return decoded;
    } 
    catch (error:any) 
    {
        throw new Error(error.message)
    }
}