import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { defaultCookieOpts } from '$lib';

export const load: PageServerLoad = async ({ url, platform, cookies }) => {
    const sessionid = cookies.get('sessionid')!;
    const email = await platform!.env.KV.get(sessionid) as string;
    if (!email) {
        cookies.delete('sessionid', defaultCookieOpts);
        redirect(302, '/admin/login');
    }
    const user = await platform!.env.D1.prepare('SELECT * FROM users WHERE email = ?').bind(email).first();
    const bills = (await platform!.env.D1.prepare('SELECT * FROM bills WHERE created_by = ? ORDER BY created_at').bind(email).all()).results;
    const newBill: boolean = url.searchParams.get('new') === 'true';
    return {
        user, bills, newBill,
    }
};
