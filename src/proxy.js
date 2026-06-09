import { NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";

const routeAccess = {
  "/job-seeker": ["seeker"],
  "/recruiter": ["recruiter"],
};

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const { pathname } = request.nextUrl;

  if (!session?.user) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const role = session.user.role;

  for (const route in routeAccess) {
    if (pathname.startsWith(route)) {
        if (!routeAccess[route].includes(role)) {
            return NextResponse.redirect(new URL("/unauthorized", request.url));
        }
    }
  }

  return NextResponse.next();
}