import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fs from 'fs';

let certKey: string | Buffer | undefined;
let certCert: string | Buffer | undefined;

if (fs.existsSync('./.cert/key.pem')) {
    certKey = fs.readFileSync('./.cert/key.pem');
    certCert = fs.readFileSync('./.cert/cert.pem');
} else {
    console.log('Missing HTTPS key/cert. You may need to run: pnpm run cert');
}


export default defineConfig({
    plugins: [sveltekit()],
    server: {
        https: {
            key: certKey,
            cert: certCert,
        },
        proxy: {}
    },
});
