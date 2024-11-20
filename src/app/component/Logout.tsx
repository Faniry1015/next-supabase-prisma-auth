'use client';
import { supabase } from "@/lib/supabase";

export default function Logout() {
  return (
    <button
      onClick={() => supabase.auth.signOut()}
      className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-300"
    >
      Logout
    </button>
  );
}
