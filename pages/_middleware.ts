import { NextResponse } from "next/server";

const protectedPages = ["/", "/playlist", "/library"];

export default function middleware(req) {
  if (protectedPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies[process.env.ACCESS_TOKEN_KEY];
    if (!token) {
      return NextResponse.redirect("/signin");
    }
  }
}
