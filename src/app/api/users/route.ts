import { data } from "../users";

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

    data.push({ ...newUser, age: parseInt(userData.age) });
    return Response.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Failed to create user:", error);
    return Response.error();
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const ids = await req.json();
   
    for (let i = data.length - 1; i >= 0; i--) {
      if (ids.includes(data[i].id)) {
        console.log('kell');     
        data.splice(i, 1); // Remove the user from the array
      }
    }
    
    
    return Response.json(
      { message: "Users deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete users:", error);
    return Response.error();
  }
}
