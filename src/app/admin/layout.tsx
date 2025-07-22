
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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
        
        if (decodedClaims.role !== 'admin') {
            console.log("User is not an admin, redirecting.");
            return redirect('/');
        }

        return <>{children}</>;

    } catch (error) {
        console.error("Error verifying session cookie or user role:", error);
        return redirect("/login");
    }
}

export default AdminLayout;
