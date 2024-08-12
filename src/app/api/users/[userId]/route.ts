import { data } from '../../users'

import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from "next/server";

export async function GET(   
      req:NextRequest,   
      {
            params,
      }: {
            params: { userId: string };
      }
) {
      const user = data.find((comment) => comment.id === parseInt(params.userId));

      if (!user) {
            redirect('/');
      }
      return NextResponse.json(user);
}

export async function PATCH(
      req: NextRequest,
      {
            params,
      }: {
            params: { userId: string };
      }
) {
      const userData = await req.json();
      let user = data.findIndex((user) => user.id === parseInt(params.userId));
      
      if (user<0) {
            return Response.json({ error: 'User not found' }, { status: 404 });
      }

      data[user] = {
            ...userData,
            age:parseInt(userData.age)
      }
      console.log(data);


      return Response.json(user);
}

