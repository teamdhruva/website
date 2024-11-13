<script>
  import { page } from "$app/stores";

  const origin = $page.url.origin;
</script>

<svelte:head>
  <title>Recruitment</title>

  <meta property="og:title" content="Team dhRuVa" />
  <meta
    property="og:description"
    content="Join us! Team dhRuVa is recruiting!"
  />
  <meta property="og:url" content="https://teamdhruva.com/recruitment" />
  <meta property="og:type" content="website" />

  <script src="https://accounts.google.com/gsi/client" async></script>
</svelte:head>

<div
  class="flex flex-col items-center justify-center min-h-screen mt-24 text-white px-6"
>
  <h1 class="text-4xl sm:text-5xl font-bold mb-4 text-center">Recruitment</h1>
  <h2 class="text-2xl text-center mb-4">Team dhRuVa is recruiting! Join us!</h2>

  <div class="w-full max-w-4xl bg-neutral-800 p-6 rounded-lg shadow-lg">
    <h2 class="text-3xl font-semibold text-yellow-300 mb-4">
      Recruitment Test
    </h2>
    <table class="table-auto w-full text-left text-gray-300 mb-6">
      <tbody>
        <tr>
          <td class="py-2 px-4">📅 <span class="text-white">Date</span></td>
          <td class="py-2 px-4">November 23, 2024</td>
        </tr>
        <tr class="bg-gray-700">
          <td class="py-2 px-4">⏰ <span class="text-white">Time</span></td>
          <td class="py-2 px-4">pls tell me</td>
        </tr>
        <tr>
          <td class="py-2 px-4">📍 <span class="text-white">Venue</span></td>
          <td class="py-2 px-4"
            >DTL Huddle</td
          >
        </tr>
      </tbody>
    </table>

    <h2 class="text-2xl text-center">Register now</h2>

    <div class="flex justify-center items-center mt-3 mb-6">
      <div
        id="g_id_onload"
        data-client_id="253628048141-1hfqpshu4heivt98qtchfcvuu797pkq9.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="redirect"
        data-login_uri={`${origin}/recruitment/redirect`}
        data-auto_prompt="false"
      ></div>

      <div
        class="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="filled_blue"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
        data-width="320"
      ></div>
    </div>

    <div>
      To register, sign in aboveith your RVCE email ID. Fill out the form and
      attend the recruitment test on the specified date and time.
    </div>
  </div>

  <p class="mt-10 text-gray-400">
    We look forward to seeing you there!
  </p>
</div>
