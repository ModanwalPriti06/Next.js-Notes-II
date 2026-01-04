# Next.js-Notes-II

| Sl. No. | Topic                                               |
| ------- | --------------------------------------------------- |
| 19      | API Routes (Route Handlers)                         |


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
| 17      | next/link & Client Navigation                       |
| 18      | Metadata & SEO                                      |
| 19      | Authentication (NextAuth or Custom Auth)            |
| 20      | Database Integration (Prisma, MongoDB, Supabase)    |
| 21      | Deployment (Vercel / Node Server)                   |
| 22      | Error Handling (error.js, not-found.js)             |
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




























