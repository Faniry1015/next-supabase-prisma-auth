'use client';

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  if (!data.session?.user) {
    redirect("/login");
  }

  const notes = await prisma.note.findMany({
    where: { userId: data.session.user.id },
  });
  return (
    <main>
      <h1 className="text-2xl text-center mb-8">Protected page</h1>
      <pre>{JSON.stringify({ session: data.session, notes }, null, 4)}</pre>
    </main>
  );
}
