"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logout from "./Logout";
import { useAuth } from "../context/AuthContextProvider";

export default function Header() {
    const authContext = useAuth();
    useEffect(() => {
        const user = authContext?.user;
        const isLoggedIn = user !== null;
        setIsLoggedIn(isLoggedIn);
    })
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simule l'état de connexion


  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Logo
            </Link>
          </div>

          {/* Navbar */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Accueil
            </Link>
            <Link href="/todos" className="text-gray-700 hover:text-blue-600">
              Todos
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600">
              Blog
            </Link>
          </nav>

          {/* Bouton Sign In/Out */}
          <div>
            {isLoggedIn ? (
                <div className="text-gray-700 d-flex"> <span> Bonjour {authContext?.user?.email} </span><Logout /></div>
            ) : (
              <Link href="/login">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
