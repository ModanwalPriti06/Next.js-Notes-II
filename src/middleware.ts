import { NextRequest, NextResponse } from "next/server";

// Custom matcher config
export function middleware1(request: NextRequest){
    return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
    matcher: '/profile'
}

//  Conditional statements middleware
export function middleware(request: NextRequest){
    if(request.nextUrl.pathname === '/profile'){
        return NextResponse.redirect(new URL('/hello', request.nextUrl));
        // return NextResponse.rewrite(new URL('/hello', request.nextUrl));  //check Readme.md file for this.
    }
}


// Cookie in middleware 
// export function middleware(request: NextRequest) {
//   const response = NextResponse.next();

//   const themePreference = request.cookies.get("theme");

//   if (!themePreference) {
//     response.cookies.set("theme", "dark");
//   }
//  response.headers.set('custome-header': 'custome-value');

//   return response;
// }
