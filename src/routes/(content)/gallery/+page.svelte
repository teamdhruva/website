<script lang="ts">
  import { galleryImages } from "$lib/gallery";
</script>

<svelte:head>
  <title>Events</title>
</svelte:head>

<div
  class="flex flex-col max-w-screen-lg w-full mx-4 mb-4 mt-40 text-xl gap-4 relative"
>
  <h1 class="text-6xl text-center font-bold text-white">Gallery</h1>
  <div class="flex flex-wrap justify-center">
    {#each galleryImages as image}
      <div
        class="inline-block flex-row w-64 h-80 bg-neutral-800 hover:bg-neutral-700 transition rounded-md m-4 p-2"
      >
        <div class="flex h-full flex-col items-center justify-center gap-4">
          <img
            class="flex flex-1 text-center items-center justify-center rounded-lg"
            src={image.src}
            alt={image.alt}
            loading="lazy"
          />
          <p class="text-lg">{image.alt}</p>
        </div>
      </div>
    {/each}
  </div>
</div>
