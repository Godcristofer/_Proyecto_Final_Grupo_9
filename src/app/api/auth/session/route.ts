
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import admin from 'firebase-admin';
import { firebaseAdminConfig } from '@/lib/firebase-admin-config';

async function initializeFirebaseAdmin() {
    if (!admin.apps.length) {
        try {
            admin.initializeApp({
                credential: admin.credential.cert(firebaseAdminConfig)
            });
            console.log("Firebase Admin initialized successfully in API route.");
        } catch (error: any) {
            console.error("Firebase admin initialization error in API route:", error.message);
            throw new Error("Failed to initialize Firebase Admin SDK.");
        }
    }
}

export async function POST(request: Request) {
  await initializeFirebaseAdmin();
  
  try {
    const authorization = request.headers.get('Authorization');
    if (!authorization?.startsWith('Bearer ')) {
      return new Response('Unauthorized: No bearer token found.', { status: 401 });
    }

    const idToken = authorization.split('Bearer ')[1];
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    const decodedToken = await admin.auth().verifyIdToken(idToken);

    if (new Date().getTime() / 1000 - decodedToken.auth_time > 5 * 60) {
        return new Response('Unauthorized: Recent sign-in required.', { status: 401 });
    }

    const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });
    const isProduction = process.env.NODE_ENV === 'production';
    
    cookies().set('session', sessionCookie, { 
      maxAge: expiresIn, 
      httpOnly: true, 
      secure: isProduction, 
      path: '/' 
    });
    
    return NextResponse.json({ status: 'success' });

  } catch (error: any) {
    console.error('Error creating session cookie:', error);
    const errorMessage = error.message || 'Unknown error during session creation.';
    return new Response(`Unauthorized: ${errorMessage}`, { status: 401 });
  }
}

export async function DELETE() {
  try {
    cookies().delete('session');
    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Error deleting session cookie:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
