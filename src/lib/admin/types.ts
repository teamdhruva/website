export interface User {
    id: number;
    email: string;
    name: string;
    usn: string;
    phone_number: string;
    slug: string;
    permissions: number;
    batch: string;
    created_at: string;
}

export interface Bill {
    id: number;
    created_at: string;
    paid_at?: string;
    image_slug: string;
    amount: number;
    created_by: string;
    pay_to: string;
    description: string;
    name?: string;
}
