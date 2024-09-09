export const prerender = false;

import type { LayoutServerLoad } from './$types';

// if the cookie 'accessToken' or 'refreshToken' or 'expiresAt' is not set, redirect to login page
export const load: LayoutServerLoad = async ({ cookies }) => {
	const sessionid = cookies.get('sessionid');

	if (!sessionid) {
        return {
            status: 302,
            redirect: '/admin/login',
        };
    }
};
