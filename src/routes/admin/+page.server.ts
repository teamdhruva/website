import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform, cookies }) => {
	const sessionid = cookies.get('sessionid')!;
    const email = await platform?.env.KV.get(sessionid) as string;
    const user = await platform?.env.D1.prepare('SELECT * FROM users WHERE email = ?').bind(email).first();
    return user;
};
