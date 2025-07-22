
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/users";
import admin from 'firebase-admin';
import { firebaseAdminConfig } from "@/lib/firebase-admin-config";

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(firebaseAdminConfig)
    });
}

async function AdminLayout({ children }: { children: React.ReactNode }) {
    
    const sessionCookie = cookies().get('session')?.value;

    if (!sessionCookie) {
        return redirect("/login");
    }

    try {
        const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
        const user = await getUserById(decodedClaims.uid);

        if (user?.role !== 'admin') {
            return redirect('/');
        }

        return <>{children}</>;

    } catch (error) {
        console.error("Error verifying session cookie:", error);
        return redirect("/login");
    }
}

export default AdminLayout;
