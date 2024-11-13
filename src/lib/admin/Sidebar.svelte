<script lang="ts">
  import { page } from "$app/stores";
  import { isAuthorized, TREASURER } from "./perm";
  import type { User } from "./types";

  export let user: User | undefined;

  const routes = [
    { path: "/admin", name: "Dashboard" },
    { path: "/admin/members", name: "Members" },
    { path: "/admin/emails", name: "Custom Emails" },
  ];

  if (user && isAuthorized(user, TREASURER)) {
    routes.push({ path: "/admin/bills", name: "Bills" });
  }

  routes.push({ path: "/admin/recruitment", name: "Recruitment" });
  routes.push({ path: "/admin/settings", name: "Settings" })
  routes.push({ path: "/admin/logout", name: "Logout" })
  export let closeButton = false;
  export let closeCallback = () => {};
</script>

<div
  class="flex flex-col text-center w-48 bg-gradient-to-r from-neutral-900 to-transparent font-mono p-2 h-screen"
>
  {#if closeButton}
    <button
      class="text-white
        bg-opacity-50
        hover:text-blue-400
        transition
        rounded-md
        font-bold
        mt-0 w-12 text-6xl h-12"
      on:click={closeCallback}
    >
      &times;
    </button>
  {/if}

  <img src="/text_logo.webp" alt="Logo" />
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
