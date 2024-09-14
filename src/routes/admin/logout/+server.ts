import { redirect } from "@sveltejs/kit";

const defaultCookieOpts = {
    httpOnly: true,
    maxAge: 86400,
    path: '/'
};

export async function GET({ platform, request, cookies }) {
    cookies.delete('sessionid', defaultCookieOpts);
    redirect(302, '/admin');
}
