"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

export function useAuthRedirect(redirectTo: string) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in, redirect to the specified page
        router.push(redirectTo);
      }
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [router, redirectTo]);
}