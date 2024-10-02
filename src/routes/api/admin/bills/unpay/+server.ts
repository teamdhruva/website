import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { defaultCookieOpts } from '$lib';
import { isAuthorized, TREASURER } from '$lib/admin/perm';

export const DELETE: RequestHandler = async ({ request, platform, cookies }) => {
    const sessionid = cookies.get('sessionid')!;
    const email = await platform!.env.KV.get(sessionid) as string;

    if (!email) {
        cookies.delete('sessionid', defaultCookieOpts);
        error(401, 'Unauthorized');
    }

    const user = await platform!.env.D1.prepare('SELECT * FROM users WHERE email = ?').bind(email).first();

    if (!isAuthorized(user, TREASURER)) {
        error(403, 'Forbidden');
    }

    const { id } = await request.json();

    if (typeof id !== 'number') {
        error(400, 'Invalid ID format');
    }

    try {
        const updateQuery = `
            UPDATE bills
            SET paid_at = NULL
            WHERE id = ?;
        `;

        await platform!.env.D1.prepare(updateQuery).bind(id).run();

        return json({ success: true });

    } catch (err) {
        throw error(500, 'Server error');
    }
};
