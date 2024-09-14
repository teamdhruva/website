import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

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
    const users = await platform!.env.D1.prepare('SELECT name, email, slug, batch, permission_level FROM users').all();
    return users;
};
