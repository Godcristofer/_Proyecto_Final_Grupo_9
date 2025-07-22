
"use client"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getFirebaseAuth }from 'next-firebase-auth-edge/lib/auth';
import { firebaseAdminConfig } from "@/lib/firebase-admin-config";

if (
    !process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    !process.env.COOKIE_SECRET_CURRENT ||
    !process.env.COOKIE_SECRET_PREVIOUS
) {
    throw new Error(
        'Missing Firebase Auth configuration. Please set NEXT_PUBLIC_FIREBASE_API_KEY and COOKIE secrets in your .env.local file.'
    );
}

const { auth } = getFirebaseAuth({
    ...firebaseAdminConfig,
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    cookieSignature: [
      process.env.COOKIE_SECRET_CURRENT,
      process.env.COOKIE_SECRET_PREVIOUS,
    ],
    checkRevoked: true,
});

const withAdminAuth = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return async function WithAdminAuth(props: P) {
    const tokens = await auth.getTokens(cookies(), {
      checkRevoked: true,
    });

    if (!tokens || tokens.decodedToken.role !== 'admin') {
      redirect("/");
    }

    return <Component {...props} />;
  };
};

export default withAdminAuth;
