'use client';
import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { create } from "domain";

// Initialisation du client Supabase
const supabase = createClientComponentClient();
// Création du contexte
const AuthContext = createContext<AuthContextType | null>(null);

// Fournisseur du contexte
interface AuthContextProviderProps {
  children: React.ReactNode;
}

interface AuthContextType {
  user: any; // You can replace 'any' with a more specific type if available
  loading: boolean;
}

/**
 * Provides authentication context to its children.
 *
 * @param {AuthContextProviderProps} props - The props for the provider.
 * @returns {JSX.Element} The context provider with authentication state.
 */
export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }: AuthContextProviderProps): JSX.Element => {
  const [user, setUser] = useState<any>(null); // Replace 'any' with a more specific type if available
  const [loading, setLoading] = useState<boolean>(true);

  useEffect( () => {
    // Récupérer l'utilisateur actuel
    const getUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Erreur lors de la récupération de la session :", error.message);
      }
      setUser(session?.user || null);
      setLoading(false);
    };

    getUser();

    // Écouter les changements d'état utilisateur
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        setUser(session?.user || null);
      }
    });

    // Nettoyage lors du démontage
    return () => subscription.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  return useContext(AuthContext);
};
