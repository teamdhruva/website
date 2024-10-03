import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { defaultCookieOpts } from '$lib';
import type { User } from '$lib/admin/types';
import { isAuthorized, TREASURER } from '$lib/admin/perm';

export const GET: RequestHandler = async ({ platform, cookies }) => {
    const sessionid = cookies.get('sessionid')!;
    const email = await platform!.env.KV.get(sessionid) as string;

    if (!email) {
        cookies.delete('sessionid', defaultCookieOpts);
        throw error(401, 'Unauthorized');
    }

    try {
        const selectQuery = "SELECT * FROM bills WHERE created_by = ?;";

        const bills = await platform.env.D1
            .prepare(selectQuery)
            .bind(email)
            .all();

        return json({ bills: bills.results });
    } catch (err) {
        throw error(500, 'Server error');
    }
}

export const POST: RequestHandler = async ({ request, platform, cookies }) => {
    const sessionid = cookies.get("sessionid")!;
    const email = await platform!.env.KV.get(sessionid) as string;

    if (!email) {
        cookies.delete("sessionid", defaultCookieOpts);
        throw error(401, "Unauthorized");
    }

    try {
        const body: { description: string; amount: number; pay_to: string; image_slug: string } = await request.json();

        const insertQuery = "INSERT INTO bills (created_by, description, amount, pay_to, image_slug) VALUES (?, ?, ?, ?, ?);";

        await platform.env.D1
            .prepare(insertQuery)
            .bind(email, body.description, body.amount, body.pay_to, body.image_slug)
            .run();

        return json({ success: true });

    } catch (err) {
        console.log(err);
        throw error(500, "Server error");
    }
};

export const DELETE: RequestHandler = async ({ request, platform, cookies }) => {
    const sessionid = cookies.get('sessionid')!;
    const email = await platform!.env.KV.get(sessionid) as string;

    if (!email) {
        cookies.delete('sessionid', defaultCookieOpts);
        throw error(401, 'Unauthorized');
    }

    try {
        const body: { id: number } = await request.json();

        const user: User = await platform!.env.D1.prepare('SELECT * FROM users WHERE email = ?;').bind(email).first();

        const deleteQuery = "DELETE FROM bills WHERE id = ? AND created_by = ?;";
        const adminDeleteQuery = "DELETE FROM bills WHERE id = ? AND (? IS NOT NULL);";

        await platform!.env.D1
            .prepare(isAuthorized(user, TREASURER) ? adminDeleteQuery : deleteQuery)
            .bind(body.id, email)
            .run();

        return json({ success: true });

    } catch (err) {
        console.log(err);
        throw error(500, 'Server error');
    }
}
