import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { Cloudflare } from 'cloudflare';
import { CLOUDFLARE_EMAIL, CLOUDFLARE_API_KEY, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_ZONE_ID } from '$env/static/private';

const cloudflare = new Cloudflare({
    apiEmail: CLOUDFLARE_EMAIL,
    apiKey: CLOUDFLARE_API_KEY
})

const defaultCookieOpts = {
    httpOnly: true,
    maxAge: 86400,
    path: '/'
};

export const load: PageServerLoad = async ({ platform, cookies }) => {
	const sessionid = cookies.get('sessionid')!;
    const email = await platform!.env.KV.get(sessionid) as string;
    if (!email) {
        cookies.delete('sessionid', defaultCookieOpts);
        redirect(302, '/admin/login');
    }
    const rules = await cloudflare.emailRouting.rules.list(CLOUDFLARE_ZONE_ID)
    const users = (await platform!.env.D1.prepare('SELECT name, email FROM users').all()).results;

    let rulesArray = rules.result;
    return { users: users, rules: rulesArray };
};
