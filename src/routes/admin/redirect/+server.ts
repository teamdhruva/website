import { redirect } from '@sveltejs/kit';
// import { OAuth2Client } from 'google-auth-library';

const defaultCookieOpts = {
    httpOnly: true,
    maxAge: 86400,
    path: '/'
};

// const oauth = new OAuth2Client();

export async function POST({ platform, request, cookies }) {
    // const credential = (await request.formData()).get('credential') as string;

    // const ticket = await oauth.verifyIdToken({
    //     idToken: credential,
    //     audience: "253628048141-1hfqpshu4heivt98qtchfcvuu797pkq9.apps.googleusercontent.com",
    // });
    // const payload = ticket.getPayload()!;

    // const sessionid = generateSessionId();
    // platform!.env.KV.put(sessionid, payload.email!);

    // cookies.set('sessionid', sessionid, defaultCookieOpts);

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
