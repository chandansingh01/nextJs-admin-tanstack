import userData from './users.json';

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    return Response.json(userData);
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return Response.error();
  }
}



