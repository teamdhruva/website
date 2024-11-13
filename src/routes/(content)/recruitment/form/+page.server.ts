import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { defaultCookieOpts } from '$lib';

export const load: PageServerLoad = async ({ platform, cookies }) => {
	const sessionid = cookies.get('r-sessionid')!;
    const email = await platform!.env.KV.get(sessionid) as string;
    if (!email) {
        cookies.delete('r-sessionid', defaultCookieOpts);
        redirect(302, '/recruitment');
    }
    const user = await platform!.env.D1.prepare('SELECT * FROM recruitment_users WHERE email = ?').bind(email).first();
    return { user, email };
};
