import { defaultCookieOpts } from "$lib";
import { error } from "@sveltejs/kit";

export const GET = async ({ params, platform, cookies }) => {
    const sessionid = cookies.get('sessionid')!;
    const email = await platform!.env.KV.get(sessionid) as string;
    if (!email) {
        cookies.delete('sessionid', defaultCookieOpts);
        error(401, 'Unauthorized');
    }

    const id = params.slug

    if (!id) {
        error(400, 'Missing id query parameter');
    }

    const object = await platform!.env.R2.get(id);

    if (!object) {
        error(404, 'Object not found');
    }

    const body = await object.arrayBuffer();

    return new Response(body, {
        headers: {
            'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
            'Content-Length': object.size.toString(),
        }
    });
};

export const POST = async ({ params, request, platform, cookies }) => {
    const sessionid = cookies.get('sessionid')!;
    const email = await platform!.env.KV.get(sessionid) as string;
    if (!email) {
        cookies.delete('sessionid', defaultCookieOpts);
        error(401, 'Unauthorized');
    }

    const formData = await request.formData();
    const id = params.slug;
    const file = formData.get('file') as File;

    if (!id || !file) {
        error(400, 'Missing id or file');
    }

    await platform!.env.R2.put(id, file, {
        httpMetadata: {
            contentType: file.type,
        }
    });

    return new Response(id, { status: 201 });
};
