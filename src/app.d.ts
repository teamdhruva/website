// See https://kit.svelte.dev/docs/types#app

import type { D1Database, KVNamespace, R2Bucket } from "@cloudflare/workers-types";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
            env: {
                KV: KVNamespace;
                D1: D1Database;
                R2: R2Bucket;
            }
        }
	}
}

export {};
