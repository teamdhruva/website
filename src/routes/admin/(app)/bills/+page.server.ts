import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { defaultCookieOpts } from '$lib';
import { isAuthorized, TREASURER } from '$lib/admin/perm';

export const load: PageServerLoad = async ({ platform, cookies }) => {
    const sessionid = cookies.get('sessionid')!;
    const email = await platform!.env.KV.get(sessionid) as string;
    if (!email) {
        cookies.delete('sessionid', defaultCookieOpts);
        redirect(302, '/admin/login');
    }
    const user = await platform!.env.D1.prepare('SELECT * FROM users WHERE email = ?').bind(email).first();
    if (isAuthorized(user, TREASURER)) {
        const bills = (await platform!.env.D1.prepare('SELECT bills.*, users.name FROM bills JOIN users ON bills.created_by = users.email ORDER BY bills.created_at DESC').all()).results;
        return {
            user,
            bills,
        }
    }
    error(403)
};
