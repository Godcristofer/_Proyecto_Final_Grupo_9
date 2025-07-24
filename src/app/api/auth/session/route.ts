
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import admin from 'firebase-admin';
import { firebaseAdminConfig } from '@/lib/firebase-admin-config';

async function initializeFirebaseAdmin() {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(firebaseAdminConfig)
        });
    }
}

export async function POST(request: Request) {
  await initializeFirebaseAdmin();
  const authorization = request.headers.get('Authorization');

  if (authorization?.startsWith('Bearer ')) {
    const idToken = authorization.split('Bearer ')[1];
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    try {
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
  return new Response('Unauthorized: No bearer token found.', { status: 401 });
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
