export interface User {
    id: number;
    slug: string;
    name: string;
    email: string;
    created_at: number;
    date_of_joining?: Date;
    permission_level: number;
    batch: string;
}
