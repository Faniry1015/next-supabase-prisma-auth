import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
    const url = new URL(req.url)
    try {
        const cookieStore = cookies();
        if (!cookieStore) {
            console.error("Failed to get cookie store.");
            return NextResponse.redirect(new URL('/error', req.url), { status: 500 });
        }

        const supabase = createRouteHandlerClient({cookies});

        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error during sign out:", error);
            return NextResponse.redirect(new URL('/error', req.url), { status: 500 });
        }

        return NextResponse.redirect(url.origin, {status: 301});
    } catch (err) {
        console.error("Unexpected error during sign out:", err);
        return NextResponse.redirect(new URL('/error', req.url), { status: 500 });
    }
}
