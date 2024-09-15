import { defaultCookieOpts } from '$lib';
import { redirect } from '@sveltejs/kit';
import type { JWK, KeyLike } from 'jose';
import * as jose from 'jose'

export async function POST({ platform, request, cookies }) {
    const db = platform?.env.D1!
    const credential = (await request.formData()).get('credential') as string;
    const JWKS = jose.createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'))

    const { payload, protectedHeader } = await jose.jwtVerify(credential, JWKS, {
        aud: '253628048141-1hfqpshu4heivt98qtchfcvuu797pkq9.apps.googleusercontent.com',
        hd: 'rvce.edu.in'
    })

    console.log('taking off')
    console.log(payload);

    const user = await db.prepare('SELECT * FROM users WHERE email = ?').bind(payload.email).first();
    console.log('landing on the moon')
    console.log(user);

    if (!user) {
        console.log('abort mission abort mission')
        redirect(302, '/admin/login?notfound=true')
    }

    console.log('mission success')
    const sessionid = generateSessionId();
    console.log('sessionid', sessionid);
    await platform!.env.KV.put(sessionid, payload.email as string);
    cookies.set('sessionid', sessionid, defaultCookieOpts);

    console.log('deploying parachute')
    redirect(302, '/admin');
}

function generateSessionId(): string {
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let sessionId = '';
    for (let i = 0; i < 32; i++) {
        sessionId += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return sessionId;
}
