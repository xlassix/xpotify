import { NextResponse, NextRequest } from "next/server";

const protectRoute =[]// ["/", "/playlist", "/library"];

export default function middleware(req: NextRequest) {
  if (protectRoute.find((p) => p === req.nextUrl.pathname)) {
    if (!req.cookies.DELIVAME_ACCESS_TOKEN) {
      return NextResponse.redirect("/auth");
    }
  }
}
