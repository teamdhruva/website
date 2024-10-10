import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, platform }) => {
  try {
    const { name, usn, email, phone } = await request.json();

    if (!name || !usn || !email || !phone) {
      return json({ error: 'All fields are required: name, usn, email, phone' }, { status: 400 });
    }

    const query = `
      INSERT INTO registrations_oct_15 (name, usn, email, phone)
      VALUES (?, ?, ?, ?)
    `;

    const result = await platform!.env.D1.prepare(query)
      .bind(name, usn, email, phone)
      .run();

    return json({ success: true, result });
  } catch (error) {
    console.error('Error inserting data into D1:', error);
    return json({ error: 'Failed to insert data' }, { status: 500 });
  }
};
