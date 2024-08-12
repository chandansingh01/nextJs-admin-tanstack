import { data } from '../../users'

import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from "next/server";

export async function GET(
      req: NextResponse,
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
      return Response.json(user);
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
      console.log(user);

      if (!user) {
            return Response.json({ error: 'User not found' }, { status: 404 });
      }

      data[user] = {
            ...userData
      }
      console.log(data);


      return Response.json(user);
}

