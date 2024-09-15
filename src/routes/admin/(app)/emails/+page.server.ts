import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { Cloudflare } from 'cloudflare';
import { DHRUVA_CLOUDFLARE_EMAIL, DHRUVA_CLOUDFLARE_API_KEY, DHRUVA_CLOUDFLARE_ACCOUNT_ID, DHRUVA_CLOUDFLARE_ZONE_ID } from '$env/static/private';
import { defaultCookieOpts } from '$lib';

const cloudflare = new Cloudflare({
    apiEmail: DHRUVA_CLOUDFLARE_EMAIL,
    apiKey: DHRUVA_CLOUDFLARE_API_KEY
})

export const load: PageServerLoad = async ({ platform, cookies }) => {
	const sessionid = cookies.get('sessionid')!;
    const email = await platform!.env.KV.get(sessionid) as string;
    if (!email) {
        cookies.delete('sessionid', defaultCookieOpts);
        redirect(302, '/admin/login');
    }
    const rules = await cloudflare.emailRouting.rules.list(DHRUVA_CLOUDFLARE_ZONE_ID)
    const users = (await platform!.env.D1.prepare('SELECT name, email FROM users').all()).results;

    let rulesArray = rules.result;
    return { users: users, rules: rulesArray };
};
