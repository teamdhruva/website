<script lang="ts">
  import { galleryImages } from "$lib/gallery";
  import { type GalleryImage } from "$lib/gallery";
  import { quintOut } from "svelte/easing";
  import { fade, fly } from "svelte/transition";

  let selectedImage: GalleryImage | null = null;

  function openLightbox(image: GalleryImage) {
    selectedImage = image;
  }

  function closeLightbox() {
    selectedImage = null;
  }
</script>

<svelte:head>
  <title>Gallery</title>
</svelte:head>

<div
  class="flex flex-col max-w-screen-lg w-full mx-4 mb-4 mt-40 text-xl gap-4 relative"
>
  <h1 class="text-6xl text-center font-bold text-white">Gallery</h1>
  <div class="flex flex-wrap justify-center">
    {#each galleryImages as image}
      <div
        class="inline-block flex-row w-64 h-64 bg-neutral-800 hover:bg-neutral-700 transition rounded-md m-4 p-2"
      >
        <button
          class="flex h-full flex-col items-center justify-center gap-4"
          on:click={() => openLightbox(image)}
        >
          <img
            class="flex flex-1 text-center items-center justify-center rounded-lg object-contain"
            src={image.src}
            alt={image.alt}
            loading="lazy"
          />
          <p class="text-lg">{image.alt}</p>
        </button>
      </div>
    {/each}
  </div>
</div>

{#if selectedImage}
  <div class="fixed inset-0 z-50 flex items-center justify-center transition">
    <button
      transition:fade={{ duration: 150 }}
      on:click={() => closeLightbox()}
      class="cursor-default absolute inset-0 bg-black opacity-50"
    ></button>
    <div
      transition:fly={{
        delay: 0,
        duration: 200,
        x: 0,
        y: 500,
        easing: quintOut,
      }}
      class="relative bg-neutral-800 rounded-lg p-8 max-w-2xl m-8"
    >
      <h2 class="text-xl mb-4 font-semibold">{selectedImage.alt}</h2>
      <div class="flex flex-col gap-4">
        <img
          class="flex flex-1 text-center items-center justify-center rounded-lg object-contain"
          src={selectedImage.src}
          alt={selectedImage.alt}
          loading="lazy"
        />
      </div>
    </div>
  </div>
{/if}
