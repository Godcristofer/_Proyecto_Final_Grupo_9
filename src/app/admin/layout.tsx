
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import admin from 'firebase-admin';
import { firebaseAdminConfig } from "@/lib/firebase-admin-config";
import { getUserById } from "@/lib/users";

async function initializeFirebaseAdmin() {
    if (!admin.apps.length) {
        try {
            admin.initializeApp({
                credential: admin.credential.cert(firebaseAdminConfig)
            });
        } catch (error: any) {
            console.error("Firebase admin initialization error in layout:", error.message);
        }
    }
}

async function AdminLayout({ children }: { children: React.ReactNode }) {
    await initializeFirebaseAdmin();
    const sessionCookie = cookies().get('session')?.value;

    if (!sessionCookie) {
        return redirect("/login");
    }

    try {
        const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
        const user = await getUserById(decodedClaims.uid);
        
        if (!user || user.role !== 'admin') {
            return redirect('/');
        }
        
        return <>{children}</>;

    } catch (error) {
        console.error("AdminLayout: Error verifying session cookie. Redirecting to /login.", error);
        return redirect("/login");
    }
}

export default AdminLayout;
