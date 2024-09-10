import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.url;
  const cookies = req.cookies;

  const userToken = cookies.get("userToken");

  if (!userToken && url.includes("./Home")) {
    return NextResponse.redirect("http://localhost:3000/Login");
  }
  if (userToken && url.includes("./Login")) {
    return NextResponse.redirect("http://localhost:3000/Home");
  }

  return NextResponse.next();
}
