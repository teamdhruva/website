<script>
  import "../app.css";
  import Footer from "$lib/components/Footer.svelte";
</script>

<svelte:head>
  <title>dhRuVa</title>

  <script src="resp.js"></script>
</svelte:head>

<div class="flex flex-col min-h-screen">
  <slot />

  <Footer />
</div>

<div
  class="top-12 left-1/2 backdrop-blur flex shadow -translate-x-1/2 rounded-lg z-50 fixed justify-between items-center bg-transparent border-2 w-full max-w-screen-xl p-4"
>
  <div class="logo font-bold text-2xl text-white px-20">dhRuVa</div>
  <div class="flex flex-row p-3 gap-12 font-semibold no-underline">
    <span><a class="text-white transition hover:text-sky-500" href="#home">Home</a></span>
    <span><a class="text-white transition hover:text-sky-500" href="#projects">Projects</a></span>
    <span><a class="text-white transition hover:text-sky-500" href="#team">Team</a></span>
    <span><a class="text-white transition hover:text-sky-500" href="#about">About Us</a></span>
    <span><a class="text-white transition hover:text-sky-500 mr-4" href="#contact">Contact</a></span>
  </div>
</div>
