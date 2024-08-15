import getdatafromtoken from "@/helpers/getdatafromtoken"
import { NextRequest,NextResponse } from "next/server"

export async function GET(request:NextRequest){
    try 
    {
        const response=await getdatafromtoken(request);
        return NextResponse.json({message:"user found",data:response})
    } 
    catch (error) 
    {
        return NextResponse.json({message:"user not found"})
    }
}