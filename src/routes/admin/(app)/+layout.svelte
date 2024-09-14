<script lang="ts">
  import { page } from "$app/stores";
  import Sidebar from "$lib/admin/Sidebar.svelte";
  import BigBurger from "$lib/icons/BigBurger.svelte";
  import Burger from "$lib/icons/Burger.svelte";
  import { quintOut } from "svelte/easing";
  import { fade, fly } from "svelte/transition";

  interface Route {
    slug: string;
    path: string;
    name: string;
  }

  const routes = [
    { slug: "dashboard", path: "/admin", name: "Dashboard" },
    { slug: "users", path: "/admin/users", name: "Users" },
    { slug: "emails", path: "/admin/emails", name: "Custom Emails" },
    { slug: "settings", path: "/admin/settings", name: "Settings" },
  ];

  let showSidebar = false;
</script>

<div class="flex flex-row max-sm:flex-col w-full sm:h-screen min-h-screen font-mono overflow-hidden">
  <div class="contents max-sm:hidden">
    <Sidebar />
  </div>

  <div class="flex flex-row sm:hidden">
    <button on:click={() => showSidebar = true} class="p-2">
      <BigBurger />
    </button>
  </div>

  <div class="flex flex-col flex-1 min-h-screen h-full overflow-y-scroll">
    <slot />
  </div>
</div>

{#if showSidebar}
  <div class="fixed inset-0 z-50 flex items-center justify-center transition">
    <button
      transition:fade={{ duration: 150 }}
      on:click={() => showSidebar = false}
      class="cursor-default absolute inset-0 bg-black opacity-50"
    ></button>
    <div
      transition:fly={{
        delay: 0,
        duration: 200,
        x: -500,
        y: 0,
        easing: quintOut,
      }}
      class="fixed left-0 top-0 rounded-lg max-w-2xl h-screen"
    >
      <Sidebar closeCallback={() => showSidebar = false} closeButton/>
    </div>
  </div>
{/if}
