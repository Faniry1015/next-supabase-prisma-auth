"use client";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Login() {
  const formRef = useRef<HTMLFormElement>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!email || !password) {
      window.alert("Veuillez remplir tous les champs");
    }
    try {
      if (e.currentTarget.id === "signup") {
        let { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        if (data) console.log(data);
      } else if (e.currentTarget.id === "signin") {
        let { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        if (data) console.log(data);
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Sign Up
        </h1>
        <form className="space-y-4" ref={formRef}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleClick}
            id="signup"
          >
            SignUp
          </button>
          <button
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleClick}
            id="signin"
          >
            SignIn
          </button>
        </form>
      </div>
    </div>
  );
}
