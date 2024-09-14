import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, platform, cookies }) => {
    const user = await platform!.env.D1.prepare('SELECT * FROM users WHERE slug = ?').bind(params.slug).first();
    if (!user) {
        error(404);
    }
    return user;
};
