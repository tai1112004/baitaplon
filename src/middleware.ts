import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    if(token==null)
        {
            return NextResponse.redirect(new URL('/authentication', request.url)) ; 
        } 
    return NextResponse.next()
  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/account/:path*" , "/cart" , "/PurchaseOrder"]
}