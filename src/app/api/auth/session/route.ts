
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import admin from 'firebase-admin';
import { firebaseAdminConfig } from '@/lib/firebase-admin-config';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminConfig)
  });
}

export async function POST(request: Request) {
  const authorization = request.headers.get('Authorization');
  if (authorization?.startsWith('Bearer ')) {
    const idToken = authorization.split('Bearer ')[1];
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    try {
      const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });
      cookies().set('session', sessionCookie, { maxAge: expiresIn, httpOnly: true, secure: true });
      return NextResponse.json({ status: 'success' });
    } catch (error) {
      console.error('Error creating session cookie:', error);
      return new Response('Unauthorized', { status: 401 });
    }
  }
  return new Response('Unauthorized', { status: 401 });
}
