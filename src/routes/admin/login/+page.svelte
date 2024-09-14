<script>
  import { page } from "$app/stores";

  const origin = $page.url.origin;
</script>

<svelte:head>
  <title>Login</title>

  <script src="https://accounts.google.com/gsi/client" async></script>
</svelte:head>

<div class="flex flex-col min-h-screen items-center justify-center">
  <div
    id="g_id_onload"
    data-client_id="253628048141-1hfqpshu4heivt98qtchfcvuu797pkq9.apps.googleusercontent.com"
    data-context="signin"
    data-ux_mode="redirect"
    data-login_uri={`${origin}/admin/redirect`}
    data-auto_prompt="false"
  ></div>

  <div
    class="g_id_signin"
    data-type="standard"
    data-shape="pill"
    data-theme="outline"
    data-text="signin_with"
    data-size="large"
    data-logo_alignment="left"
    data-width="320"
  ></div>

  <a href="/" class="text-blue-400 hover:text-blue-500 transition p-4">Go back</a>
</div>
