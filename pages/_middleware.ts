import { NextResponse, NextRequest } from "next/server";

const protectRoute = ["/", "/playlist", "/library"];

export default function middleware(req: NextRequest) {
  const data = req.nextUrl.pathname.split("/");
  if (
    protectRoute.find(
      (p) => p === (data.length > 1 ? `/${data[1]}` : `/${data[0]}`)
    )
  ) {
    if (!req.cookies.DELIVAME_ACCESS_TOKEN) {
      return NextResponse.redirect("/auth");
    }
  }
}
