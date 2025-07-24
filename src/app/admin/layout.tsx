
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
    console.log("--- AdminLayout Check ---");

    const sessionCookie = cookies().get('session')?.value;

    if (!sessionCookie) {
        console.log("AdminLayout: No session cookie found. Redirecting to /login.");
        return redirect("/login");
    }
    console.log("AdminLayout: Session cookie found.");

    try {
        const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
        console.log(`AdminLayout: Session cookie verified for UID: ${decodedClaims.uid}`);

        const user = await getUserById(decodedClaims.uid);
        
        if (!user) {
            console.log(`AdminLayout: User with UID ${decodedClaims.uid} not found in database. Redirecting to /.`);
            return redirect('/');
        }
        console.log(`AdminLayout: User found in database. Email: ${user.email}, Role: ${user.role}`);

        if (user.role !== 'admin') {
            console.log(`AdminLayout: User role is '${user.role}'. Access denied. Redirecting to /.`);
            return redirect('/');
        }
        
        console.log("AdminLayout: User is an admin. Access granted.");
        return <>{children}</>;

    } catch (error) {
        console.error("AdminLayout: Error verifying session cookie. Redirecting to /login.", error);
        return redirect("/login");
    }
}

export default AdminLayout;
