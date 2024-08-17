import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request:NextRequest){
    const path=request.nextUrl.pathname
    const token=request.cookies.get("token")?.value || ""

    const ispublic= path==="/signup" || path==="/login" || path === "/verifyemail" || path==="/resetpswrd"
    || path==="/resetpassword";

    if(ispublic && token)
    {
        return NextResponse.redirect(new URL("/profile",request.nextUrl))
    }
    if(!ispublic && !token)
    {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}



export const config = {
    matcher: [
      '/',
      '/profile',
      '/login',
      '/signup',
      '/verifyemail',
      '/resetpswrd',
      '/resetpassword'
    ]
  }