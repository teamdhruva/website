import { defaultCookieOpts } from "$lib";
import { redirect } from "@sveltejs/kit";

export async function GET({ platform, request, cookies }) {
    cookies.delete('sessionid', defaultCookieOpts);
    redirect(302, '/admin');
}
