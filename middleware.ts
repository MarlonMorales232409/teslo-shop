// middleware.ts
import { NextFetchEvent, NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwt } from './utils';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest, event: NextFetchEvent) {
  
  const token = request.cookies.get('token');

  let isValidToken = false

  console.log(token)

  try {

    // Todo: Find an alternative to check JWT 
    
    if(!token){

      return NextResponse.rewrite( new URL('/auth/login?p=/checkout/address', request.url))

    } else {

      isValidToken = true
      return NextResponse.next()

    }
   

  } catch (error) {

    
  }
  
  
}

// See "Matching Paths" below to learn more
export const config = {

  matcher: [
      '/checkout/address/:path',
      '/checkout/summary/:path',
  ]

}