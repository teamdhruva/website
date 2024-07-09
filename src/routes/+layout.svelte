<script>
  import { fly } from "svelte/transition";
  import "../app.css";

  let visible = false;
</script>

<svelte:head>
  <title>dhRuVa</title>

  <script src="resp.js"></script>
</svelte:head>

<div class="flex flex-col min-h-screen">
  <nav class="flex flex-col fixed w-full bg-black items-center justify-center">
    <div
      class="max-sm:hidden flex flex-row items-center text-white gap-10 bg-black max-w-screen-lg pl-2 pr-5 py-2"
    >
      <div class="max-sm:hidden logo">
        <a href="#home"><img src="Dhruva logo.png" alt="logo" /></a>
      </div>
      <span class="flex-1"></span>
      <div><a class="hover:text-cyan-300" href="#home">Home</a></div>
      <div><a class="hover:text-cyan-300" href="#Projects">Projects</a></div>
      <div><a class="hover:text-cyan-300" href="#Team">Team</a></div>
      <!-- <div><a class="hover:text-cyan-300" href="#Alumni">Alumni</a></div> -->
      <div><a class="hover:text-cyan-300" href="#Contact Us">Contact</a></div>
    </div>

    {#if visible}
      <div
        transition:fly={{ y: -200, duration: 300 }}
        class="top-0 w-full fixed bg-black flex flex-col items-center gap-5 text-white p-5"
      >
        <div><a class="hover:text-cyan-300" on:click={() => visible=false} href="#home">Home</a></div>
        <div><a class="hover:text-cyan-300" on:click={() => visible=false} href="#Projects">Projects</a></div>
        <div><a class="hover:text-cyan-300" on:click={() => visible=false} href="#Team">Team</a></div>
        <!-- <div><a class="hover:text-cyan-300" on:click={() => visible=false} href="#Alumni">Alumni</a></div> -->
        <div><a class="hover:text-cyan-300" on:click={() => visible=false} href="#Contact Us">Contact</a></div>
      </div>
    {/if}

    <button class="sm:hidden burger" on:click={() => (visible = !visible)}>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </button>
  </nav>

  <slot />
</div>

<style></style>
