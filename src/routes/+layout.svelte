<script>
  import "../app.css";
  import Footer from "$lib/components/Footer.svelte";
  import { slide } from "svelte/transition";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import Burger from "$lib/icons/Burger.svelte";
  let showMenu = false;

  const links = [
    { href: "/", text: "Home" },
    { href: "/about", text: "About" },
    { href: "/projects", text: "Projects" },
    { href: "/team", text: "Team" },
    { href: "#contact", text: "Contact" }
  ];

  if (browser) {
    onMount(() => {
      window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
          showMenu = false;
        }
      });
    });
  }
</script>

<svelte:head>
  <title>dhRuVa</title>

  <!-- <script src="resp.js"></script> -->
</svelte:head>

<div class="flex flex-col min-h-screen h-full">
  <slot />

  <Footer />
</div>

<div class="top-0 mt-10 w-11/12 left-1/2 backdrop-blur flex shadow -translate-x-1/2 rounded-lg z-50 fixed justify-between items-center bg-transparent border-2 max-w-screen-xl p-4">
  <div class="logo font-bold text-2xl text-white px-10 md:px-20">dhRuVa</div>
  <div class="hidden md:flex flex-row p-3 gap-12 font-semibold no-underline">
    {#each links as link}
      <span><a class="text-white transition hover:text-sky-500" href="{link.href}">{link.text}</a></span>
    {/each}
  </div>
  <div class="md:hidden flex items-center">
    <button class="text-white" on:click={() => (showMenu = !showMenu)}>
      <Burger />
    </button>
  </div>
</div>

{#if showMenu}
  <div
    transition:slide
    class="fixed top-12 left-0 w-full bg-transparent backdrop-blur border-t-2 border-b-2 shadow-lg z-40"
  >
    <div class="flex flex-col p-4 gap-4 font-semibold items-center">
      {#each links as link}
        <span>
          <a
            class="text-white transition hover:text-sky-500"
            href="{link.href}"
            on:click={() => (showMenu = false)}
          >{link.text}</a>
        </span>
      {/each}
    </div>
  </div>
{/if}
