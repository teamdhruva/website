import { defaultCookieOpts } from "$lib";
import { type RequestHandler, error, json } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, platform, cookies }) => {
    const sessionid = cookies.get("r-sessionid")!;
    const email = await platform!.env.KV.get(sessionid) as string;

    if (!email) {
        cookies.delete("r-sessionid", defaultCookieOpts);
        throw error(401, "Unauthorized");
    }

    try {
        const body: { name: string; usn: number; batch: string; } = await request.json();

        const insertQuery = "INSERT OR REPLACE INTO recruitment_users (name, email, usn, batch) VALUES (?, ?, ?, ?);";

        await platform.env.D1
            .prepare(insertQuery)
            .bind(body.name, email, body.usn, body.batch)
            .run();

        return json({ ...body, email });

    } catch (err) {
        console.log(err);
        throw error(500, "Server error");
    }
};

export const DELETE: RequestHandler = async ({ platform, cookies }) => {
    const sessionid = cookies.get("r-sessionid")!;
    const email = await platform!.env.KV.get(sessionid) as string;

    if (!email) {
        cookies.delete("r-sessionid", defaultCookieOpts);
        throw error(401, "Unauthorized");
    }

    const deleteQuery = "DELETE FROM recruitment_users WHERE email = ?;";

    await platform.env.D1
        .prepare(deleteQuery)
        .bind(email)
        .run();

    return json({ email });
}
