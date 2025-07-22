
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/users";
import { getFirebaseAuth } from "next-firebase-auth-edge/lib/auth";
import { firebaseAdminConfig } from "@/lib/firebase-admin-config";

const auth = getFirebaseAuth(firebaseAdminConfig);

async function AdminLayout({ children }: { children: React.ReactNode }) {
    
    const tokens = await auth.getTokens(cookies(), {
      checkRevoked: true
    });

    if (!tokens) {
        redirect("/login");
    }

    const user = await getUserById(tokens.decodedToken.uid);

    if (user?.role !== 'admin') {
        redirect('/');
    }

    return <>{children}</>;
}

export default AdminLayout;
