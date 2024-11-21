import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const url = new URL(req.url);

        const cookieStore = cookies();

        const formData = await req.formData();
        const email = formData.get("email") as string | null;
        const password = formData.get("password") as string | null;

        if (!email || !password) {
            console.error("Email or password is missing.");
            return NextResponse.redirect(url.origin, { status: 400 });
        }

        const supabase = createRouteHandlerClient({
            cookies: () => cookieStore
        });

        const { error } = await supabase.auth.signUp({
            email, 
            password, 
            options: {
                emailRedirectTo: `${url.origin}/auth/callback`
            }
        });

        if (error) {
            console.error("Error during sign up:", error);
            return NextResponse.redirect(url.origin, { status: 500 });
        }

        return NextResponse.redirect(url.origin);
    } catch (err) {
        console.error("An unexpected error occurred:", err);
        return NextResponse.redirect(new URL('/error', req.url), { status: 500 });
    }
}
    