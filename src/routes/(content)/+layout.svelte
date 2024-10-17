<script>
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
    { href: "/gallery", text: "Gallery" },
    // { href: "/events", text: "Events" },
    { href: "/team", text: "Team" },
    { href: "#contact", text: "Contact" },
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

<div class="flex flex-col min-h-screen h-full">
  <div class="flex flex-1 flex-col items-center bg-neutral-900 min-h-screen">
    <slot />
  </div>

  <Footer />
</div>

<div
  class="top-0 mt-10 w-11/12 left-1/2 backdrop-blur flex shadow -translate-x-1/2 rounded-lg z-50 fixed justify-between items-center bg-transparent border max-w-screen-xl p-4"
>
  <a class="logo font-bold text-2xl text-white" href="/">
    <img src="/text_logo.webp" class="max-sm:h-8 sm:h-12" alt="dhRuVa logo" />
  </a>
  <div class="hidden md:flex flex-row p-3 gap-12 font-semibold no-underline">
    {#each links as link}
      <span
        ><a class="text-white transition hover:text-sky-500" href={link.href}
          >{link.text}</a
        ></span
      >
    {/each}
  </div>
  <div class="md:hidden flex items-center">
    <button
      class="text-white"
      on:click={() => (showMenu = !showMenu)}
      aria-label="Open Navigation Menu"
    >
      <Burger />
    </button>
  </div>
</div>

{#if showMenu}
  <div
    transition:slide
    style="-webkit-backdrop-filter: blur(10px);"
    class="fixed top-28 left-0 w-full bg-transparent backdrop-blur border shadow-lg z-40"
  >
    <div class="flex flex-col p-4 gap-4 font-semibold items-center">
      {#each links as link}
        <span>
          <a
            class="text-white transition hover:text-sky-500"
            href={link.href}
            on:click={() => (showMenu = false)}>{link.text}</a
          >
        </span>
      {/each}
    </div>
  </div>
{/if}
