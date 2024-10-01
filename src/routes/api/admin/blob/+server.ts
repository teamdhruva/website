import { error } from '@sveltejs/kit';

export const GET = async ({ url, platform }) => {
  try {
    const id = url.searchParams.get('id');

    if (!id) {
      throw error(400, 'Missing id query parameter');
    }

    const object = await platform.env.R2.get(id);

    if (!object) {
      throw error(404, 'Object not found');
    }

    const body = await object.arrayBuffer();

    return new Response(body, {
      headers: {
        'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
        'Content-Length': object.size.toString(),
      }
    });
  } catch (err) {
    error(500);
  }
};

export const POST = async ({ request, platform }) => {
  try {
    const formData = await request.formData();
    const id = formData.get('id')?.toString();
    const file = formData.get('file') as File;

    if (!id || !file) {
      throw error(400, 'Missing id or file in form data');
    }

    // Upload file to R2
    await platform!.env.R2.put(id, file, {
      httpMetadata: {
        contentType: file.type,
      }
    });

    return new Response(id, { status: 201 });
  } catch (err) {
    error(500);
  }
};
