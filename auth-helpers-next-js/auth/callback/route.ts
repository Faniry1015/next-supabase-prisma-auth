import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * This is the callback route for the OAuth flow. This route is hit after the user
 * has authorized the app and the authorization server has redirected the user
 * back to this route with an authorization code.
 *
 * The authorization code is exchanged for an access token and a refresh token.
 *
 * The access token is then used to make requests to the protected API endpoints.
 *
 * The refresh token is used to obtain a new access token when the current one
 * expires.
 *
 * @param {NextRequest} req
 * @returns {Promise<NextResponse>}
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (code) {
        /**
         * Get the cookie store so that we can store the session cookies
         */
        const cookieStore = cookies();

        /**
         * Create a new instance of the Supabase client with the cookie store
         */
        const supabase = createRouteHandlerClient({
            cookies: () => cookieStore
        });

        /**
         * Exchange the authorization code for an access token and a refresh token
         */
        await supabase.auth.exchangeCodeForSession(code);
    }

    /**
     * Redirect the user back to the home page after the authorization flow is complete
     */
    return NextResponse.redirect(url.origin, {
        status: 301
    })
}
