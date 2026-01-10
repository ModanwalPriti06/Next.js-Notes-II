import { NextRequest } from "next/server"
import { cookies, headers } from "next/headers"


// Important for get Header

// export async function GET(request: NextRequest){
//     const reqHeader = new Headers(request.headers);
//     console.log(reqHeader.get("Authorization"));
//     return new Response('Hello Profile Route')
// }

export async function GET(request: NextRequest){
    const headersList = await headers();
    console.log(headersList.get("Authorization"))

    // 1st approcah setted cookie get
    const theme = request.cookies.get("theme")
    console.log(theme)

    // 2nd approach to set cookie
    const cookieStore = await cookies();
    cookieStore.set('newCookie', '232');
    console.log(cookieStore.get('newCookie'))

    // 1st approach to set cookie
    return new Response('<h1> Profile Route </h1>', {  //showing heading text on browser when go to url localhost:3000/profile/api
        headers: {
            'Content-Type' : 'text/html',
            "Set-Cookie" : "theme=dark"
        },
    })
}
