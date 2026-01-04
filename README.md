# Next.js-Notes-II

| Sl. No. | Topic                                               |
| ------- | --------------------------------------------------- |
| 19      | API Routes (Route Handlers)/ GET, POST              |
| 20      | Dynamic Route Handle / PATCH, DELETE                |
| 21      | URL Query Parameter/  Headers in Route Handler      |
| 22      | COOKIE in Route Handler/ Redirect in Route Handler  |
| 23      | Cashing in Route Handler                            |


| -       | Uncovered Topic                                     |
| ------- | --------------------------------------------------- |
| 8       | Server Components vs Client Components |
| 9       | Data Fetching (fetch, getServerSideProps, etc.)     |
| 10      | Static Site Generation (SSG)                        |
| 11      | Server-Side Rendering (SSR)                         |
| 12      | Incremental Static Regeneration (ISR)               |
| 13      | Middleware                                          |
| 14      | Environment Variables                               |
| 15      | Styling (CSS, Tailwind, Modules, Styled Components) |
| 16      | Optimizing Images using next/image                  |
| 18      | Metadata & SEO                                      |
| 19      | Authentication (NextAuth or Custom Auth)            |
| 20      | Database Integration (Prisma, MongoDB, Supabase)    |
| 21      | Deployment (Vercel / Node Server)                   |
| 23      | Loading UI (loading.js)                             |
| 24      | Caching & Revalidation                              |
| 25      | Internationalization (i18n)                         |

# 19. Routes Handler
A Route Handler is how you create backend APIs (like Express routes) inside your Next.js app.
- The app router lets you create custom request handlers for your routes using a feature called Route Handlers
- Unlike page routes, which give us HTML content, Route Handlers let us build RESTful endpoints with complete control over the response
- Think of it like building a Node + Express app
- There's no need to set up and configure a separate server

### Route handlers contd.
1. Route Handlers are great when making external API requests as well
2. For example, if you're building an app that needs to talk to third-party services
3. Route handlers run server-side, our sensitive info like private keys stays secure and never reaches the browser.
4. Route Handlers are the equivalent of API routes in Page router
5. Next.js supports GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS
6. If an unsupported method is called, Next.js will return a 405 Method Not Allowed response

#### 📁 Folder Structure (App Router)
```
app/
 └── api/
     └── users/
         └── route.js
```
URL become: 
```
/api/users
```
### GET Request

```
export async function GET(){
    return new Response('Hello World!')
}
```
### POST Request
```
export async function POST(request) {
  const body = await request.json();

  return Response.json({
    success: true,
    data: body,
  });
}
```
### Multiple Methon in one file
```
export async function GET() {
  return Response.json({ message: "GET request" });
}

export async function POST() {
  return Response.json({ message: "POST request" });
}

export async function DELETE() {
  return Response.json({ message: "DELETE request" });
}
```

## Difference between Route.ts and Profile.tsx
Both route.ts and page.tsx define a URL automatically in Next.js.
- route.ts → handles API requests
- page.tsx → renders UI
  
```
 app/
 ├── route.ts
 ├── profile/
 │   ├── api/
 │   │   └── route.ts
 │   └── page.tsx
```
<img width="1728" height="483" alt="Screenshot 2026-01-04 at 3 37 01 PM" src="https://github.com/user-attachments/assets/ba9e33c1-6202-4579-88cc-3ee6347d737f" />

```
import { comments } from "./data";

export async function GET(){
    return Response.json(comments);
}

export async function POST(request: Request) {
  try {
    const comment = await request.json();

    const newCommentObj = {
      id: comments.length + 1,
      text: comment.text,
    };

    comments.push(newCommentObj);

    return Response.json(newCommentObj, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: "Invalid or missing JSON body" },
      { status: 400 }
    );
  }
}
```
# 20. Dynamic Route Handler
Folder Structure
```
app/api/comments/[id]/route.ts

import { comments } from "../data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {

    const {id} = await params;
    const comment = comments.find((comment) => comment.id === parseInt(id))
    return Response.json(comment);
}
```

## Patch Request
```
export async function PATCH( request: Request,
  { params }: { params: Promise<{ id: string }> })
  {

    const {id} = await params;
    const body = await request.json();
    const { text } = body
    const index = comments.findIndex((comment) => comment.id === parseInt(id))
    comments[index].text = text;

    return Response.json(comments[index]);
}
```
## DELETE Request
```
export async function DELETE( request: Request,
  { params }: { params: Promise<{ id: string }> })
  {

    const {id} = await params;
    const index = comments.findIndex((comment) => comment.id === parseInt(id))
    const deleteComment = comments[index]
    comments.splice(index, 1);
    return Response.json(deleteComment);
}
```

# 21. URL Query Parameter   
<img width="426" height="122" alt="Screenshot 2026-01-04 at 5 00 38 PM" src="https://github.com/user-attachments/assets/630dbd10-0340-4ec0-a1f0-b08c747085c5" />

```
/app/comments/route.ts

export async function GET(request: NextRequest){
   const searchParams =  request.nextUrl.searchParams;
   const query = searchParams.get('query');
   const filterComments = query ? comments.filter((comment)=> comment.text.includes(query)) : comments
    return Response.json(filterComments);
}
```
# 21.1 Headers in Route Handler
HTTP headers represent the metadata associated with an API request and response. It have 2 classification: 
### 1. Request Headers
These are sent by the client, such as a web browser, to the server. They contain essential information about the request, which helps the server understand and process it correctly.
- User-Agent: Identifies the browser and operating system to the server.
- Accept: Indicates the content types like text, video, or image formats that the client can process.
- Authorization header used by the client to authenticate itself to the server.

### 2. Request Headers
These are sent back from the server to the client. They provide information about the server and the data being sent in the response.
- Content-Type: This header indicates the media type of the response. It tells the client what the data type of the returned content is, such as: text/html for HTML documents, application/json for JSON data, image/png, image/jpeg for images, etc.

### Example:
<img width="678" height="245" alt="Screenshot 2026-01-04 at 5 21 17 PM" src="https://github.com/user-attachments/assets/e3da97b3-5bd9-453f-939a-e1ef2db32c3b" />

```
app/profile/api/route.ts

import { NextRequest } from "next/server"

export async function GET(request: NextRequest){
    const reqHeader = new Headers(request.headers);
    console.log(reqHeader.get("Authorization"));
    return new Response('Hello Profile Route')
}
```
OR
```
import { NextRequest } from "next/server"
import { headers } from "next/headers"

export async function GET(request: NextRequest){
    const headersList = await headers();
    console.log(headersList.get("Authorization"))
    return new Response('Hello Profile Route')
}
```
<img width="372" height="106" alt="Screenshot 2026-01-04 at 5 27 16 PM" src="https://github.com/user-attachments/assets/3e075a5b-70a2-4f31-a58f-5abd4d789827" />

```
export async function GET(request: NextRequest){
    const headersList = await headers();
    console.log(headersList.get("Authorization"))
    return new Response('<h1> Profile Route</h1', {
        headers: {'Content-Type' : 'text/html'}
    })
}
```

# 22. COOKIE in Route Handler
Cookies are small pieces of data that a server sends to a user’s web browser. The browser can store the cookies and send them back to the same server with future requests.

### Cookies serve three main purposes:

1. Managing sessions: (like user logins and shopping carts)
2. Handling personalization: (such as user preferences and themes)
3. Tracking: (like recording and analyzing user behavior)

### 1. Frist Approach: How to set and get cookie inside route handler

```
/app/profile/route.ts

export async function GET(request: NextRequest){

    const theme = request.cookies.get("theme")
    console.log(theme)
    return new Response('<h1> Profile Route</h1', {  
        headers: {
            'Content-Type' : 'text/html',
            "Set-Cookie" : "theme=dark"
        },
    })
}
```
<img width="976" height="248" alt="Screenshot 2026-01-04 at 5 51 19 PM" src="https://github.com/user-attachments/assets/1aaceab7-f9a9-4e40-8ab7-5c17f55e3e0b" />

### 2. Second Approach: How to set and get cookie inside route handler
```

import { NextRequest } from "next/server"
import { cookies, headers } from "next/headers"

export async function GET(request: NextRequest){

    const cookieStore = await cookies();
    cookieStore.set('newCookie', '232');
    console.log(cookieStore.get('newCookie'))

    return new Response('<h1> Profile Route</h1', {  //showing heading text on browser when go to url localhost:3000/profile/api
        headers: {
            'Content-Type' : 'text/html',
            "Set-Cookie" : "theme=dark"
        },
    })
}
```

## 22.1 Redirect in Route Handler
```
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.redirect(new URL('/login', 'http://localhost:3000'));
}
```
# 23. Cashing in Route Handler   
Route handler are not cashed by default but you can opt into cashing when using the GET method.
```
// src/app/time/route.ts

export const dynamic = "force-static";
export async function GET() {
  return Response.json({time: new Date().toLocaleTimeString()})
}
```
Cache data
```
// src/app/categories/route.ts

export const dynamic = "force-static";
export const revalidate= 10;

export async function GET() {
  // This data would typically come from a database
  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Books" },
    { id: 3, name: "Clothing" },
    { id: 4, name: "Home & Garden" },
  ];
  return Response.json(categories);
}
```
#### 2️⃣ export const dynamic = "force-static";
📌 Very important (interview question)
- Forces this API route to be statically generated.
- Data is calculated at build time.
- Same response is served for every request.

#### ✅ Good for:
- Static data
- Categories, countries, configs

#### ❌ Not good for:
- User-specific or frequently changing data

> [!Important]
> force-static use karne ke bad data tabhi change hoga jab hm application ko phir se run build krte hai.

> [!Important]
> revalidate = 10, use karne se static data every 10 sec k bad change hoga. If force-static bhi add kie ho file me to bhi 10 sec bad data revalidate hoga.



























