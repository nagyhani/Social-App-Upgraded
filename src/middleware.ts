import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
 
    const token = await getToken({req :request })

    if(token){
        return NextResponse.next()
    }else{
         return NextResponse.redirect(new URL('/Login', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/" ,"/userProfile" , "/postDetails"],
}