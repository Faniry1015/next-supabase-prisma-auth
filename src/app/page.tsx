'use client'

import { useEffect, useState } from "react";
import Logout from "./component/Logout";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const user = supabase.auth.getSession();
    console.log(user);
    setIsLoggedIn(user !== null);
  }, []);


  return (
    <div>
      <div>Hello</div>
      {isLoggedIn && <Logout />}
      </div>
  );
}
