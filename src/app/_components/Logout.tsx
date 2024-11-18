
"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <>
      <button onClick={handleSignOut}  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Sign out</button>
    </>
  );
}
