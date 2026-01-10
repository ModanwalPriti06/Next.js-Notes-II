import { NextRequest } from "next/server";
import { comments } from "./data";

// export async function GET(){
//     return Response.json(comments);
// }

export async function GET(request: NextRequest){
   const searchParams =  request.nextUrl.searchParams;
   const query = searchParams.get('query');
   const filterComments = query ? comments.filter((comment)=> comment.text.includes(query)) : comments
    return Response.json(filterComments);
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
      { error: error},
      { status: 400 }
    );
  }
}

