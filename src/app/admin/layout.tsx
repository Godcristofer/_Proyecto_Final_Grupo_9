
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import admin from 'firebase-admin';
import { firebaseAdminConfig } from "@/lib/firebase-admin-config";
import { getUserById } from "@/lib/users";

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(firebaseAdminConfig)
    });
}

async function AdminLayout({ children }: { children: React.ReactNode }) {
    console.log("--- AdminLayout: Verificación de acceso iniciada ---");
    
    const sessionCookie = cookies().get('session')?.value;

    if (!sessionCookie) {
        console.log("AdminLayout: No se encontró la cookie de sesión. Redirigiendo a /login.");
        return redirect("/login");
    }
    console.log("AdminLayout: Cookie de sesión encontrada.");

    try {
        const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
        console.log(`AdminLayout: Cookie verificada para UID: ${decodedClaims.uid}`);
        
        const user = await getUserById(decodedClaims.uid);
        
        if (!user) {
            console.log(`AdminLayout: No se encontró un usuario en la base de datos con el UID: ${decodedClaims.uid}. Redirigiendo a /.`);
            return redirect('/');
        }
        
        console.log("AdminLayout: Datos del usuario obtenidos de la base de datos:", { id: user.id, email: user.email, role: user.role });

        if (user.role !== 'admin') {
            console.log(`AdminLayout: El usuario ${decodedClaims.uid} no tiene el rol de 'admin'. Rol encontrado: '${user.role}'. Redirigiendo a /.`);
            return redirect('/');
        }

        console.log(`AdminLayout: Acceso concedido al usuario ${decodedClaims.uid} con rol 'admin'.`);
        return <>{children}</>;

    } catch (error) {
        console.error("AdminLayout: Error al verificar la cookie de sesión:", error);
        console.log("AdminLayout: Redirigiendo a /login debido a un error en la verificación.");
        return redirect("/login");
    }
}

export default AdminLayout;
