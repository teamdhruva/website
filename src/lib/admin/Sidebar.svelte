<script lang="ts">
  import { page } from "$app/stores";

  const routes = [
    { path: "/admin", name: "Dashboard" },
    { path: "/admin/members", name: "Members" },
    { path: "/admin/emails", name: "Custom Emails" },
    { path: "/admin/settings", name: "Settings" },
    { path: "/admin/logout", name: "Logout" },
  ];

  export let closeButton = false;
  export let closeCallback = () => {};
</script>

<div
  class="flex flex-col text-center w-48 bg-gradient-to-r from-neutral-900 to-transparent font-mono p-2 h-screen"
>
  <img src="/text_logo.png" alt="Logo" />
  <p class="font-bold text-2xl">INTERNAL</p>

  <div class="flex flex-col mt-8 gap-4">
    {#each routes as route}
      <a
        href={route.path}
        class="text-white rounded-md hover:text-blue-400 bg-neutral-700 bg-opacity-50 hover:bg-neutral-800 transition py-2"
        class:font-bold={route.path === $page.url.pathname}
        on:click={closeCallback}
        class:text-red-300={route.name === "Logout"}
        class:hover:text-red-400={route.name === "Logout"}
      >
        {route.name}
      </a>
    {/each}
  </div>
</div>
