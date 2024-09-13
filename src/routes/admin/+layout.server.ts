export const prerender = false;

import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

// if the cookie 'accessToken' or 'refreshToken' or 'expiresAt' is not set, redirect to login page
export const load: LayoutServerLoad = async ({ route, cookies }) => {
	const sessionid = cookies.get('sessionid');

	if (!sessionid && route.id !== '/admin/login') {
        redirect(302, '/admin/login')
    }
};
