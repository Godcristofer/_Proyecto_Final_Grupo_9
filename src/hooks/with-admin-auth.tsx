
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getFirebaseAuth } from "next-firebase-auth-edge/lib/auth";
import { firebaseAdminConfig } from "@/lib/firebase-admin-config";

const { auth } = getFirebaseAuth({
    ...firebaseAdminConfig,
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
