import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) =>{
    const res = NextResponse.next(); //permet de poursuivre vers la prochaine page si tout va bien
    const surpabase = createMiddlewareClient({ req, res });
    const {
        data: { session },
      } = await surpabase.auth.getSession();
      console.log(session)

    if (!session) {
        return NextResponse.rewrite(new URL("/login", req.url));
    }

    return res;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      ],
}