"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async () => {
    if (!email || !password) {
      setErrorMessage("Email et mot de passe sont requis.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        router.refresh();
      }
    } catch (err) {
      setErrorMessage("Une erreur inattendue est survenue.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      setErrorMessage("Email et mot de passe sont requis.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        router.refresh();
      }
    } catch (err) {
      setErrorMessage("Une erreur inattendue est survenue.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {errorMessage && (
        <p className="bg-red-700 p-4 text-white" aria-live="polite">
          {errorMessage}
        </p>
      )}
      <form className="flex flex-col gap-4">
        <label className="grid">
          Email
          <input
            className="p-2 text-black"
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </label>
        <label className="grid">
          Password
          <input
            className="p-2 text-black"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </label>
        <button
          className="bg-gray-800 p-2 text-white"
          type="button"
          onClick={handleSignUp}
          disabled={isLoading}
        >
          {isLoading ? "Signing up..." : "Sign up"}
        </button>
        <button
          className="bg-gray-800 p-2 text-white"
          type="button"
          onClick={handleSignIn}
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </>
  );
}
