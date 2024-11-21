import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    console.log("signin")
    const url = new URL(req.url);
    try {
        const cookieStore = cookies();

        const formData = await req.formData();
        const email = formData.get("email") as string | null;
        const password = formData.get("password") as string | null;

        if (!email || !password) {
            console.error("Email or password is missing.");
            return NextResponse.redirect(url.origin, { status: 400 });
        }

        const supabase = createRouteHandlerClient({
            cookies: () => cookieStore,
        });

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        console.log(data)
        console.log(error)

        if (error) {
            console.error("Error during sign in:", error);
            return NextResponse.rewrite(url.origin, { status: 400 });
        }

        return NextResponse.rewrite(url.origin, { status: 200 });
    } catch (error) {
        console.error("Unexpected error during sign in:", error);
        return NextResponse.rewrite(url.origin, { status: 500 });
    }
}
