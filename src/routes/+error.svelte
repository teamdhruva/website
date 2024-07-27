<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="regular-bg min-h-screen flex items-center justify-center">
  <div class="flex flex-col text-center mt-40">
    <h1 class="text-6xl font-extrabold text-red-500">Oops!</h1>
    <p class="text-2xl mt-4 text-neutral-500">Something went wrong</p>
    <p class="text-xl mt-2 text-white">{$page.error.message}</p>
    <div class="mt-4">
      <a href="/" class="text-sky-500 text:bg-sky-600 px-6 rounded-md text-lg transition">
        Go Back Home
      </a>
    </div>
  </div>
</div>
