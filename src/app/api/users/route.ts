import { data } from '../users';

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    return Response.json(data);
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return Response.error();
  }
}



export async function POST(req: NextRequest) {
  try {
    const userData = await req.json();
    const newUser = {
      id: data.length + 1,
      ...userData,
    };
    console.log(userData);

    data.push(newUser);
    return Response.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Failed to create user:", error);
    return Response.error();
  }
}
