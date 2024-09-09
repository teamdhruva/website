<script lang="ts">
  import { projects } from "$lib/projects";

  interface Project {
    name: string;
    slug: string;
    image?: string;
    description: string;
    dateStarted: string;
    dateCompleted?: string;
  }
</script>

<svelte:head>
  <title>Projects</title>
</svelte:head>

<div
  class="flex flex-col items-center max-w-screen-lg w-full mx-4 mb-4 mt-40 text-xl gap-4 relative"
>
  <h1 class="text-6xl text-center font-bold text-white">Projects</h1>

  <div class="flex flex-col max-w-screen-lg w-full">
    {#each projects as project, index}
      <a
        href={`/projects/${project.slug}`}
        class="flex max-sm:flex-col max-sm:items-center bg-neutral-800 hover:bg-neutral-700 bg-opacity-50 hover:bg-opacity-50 transition rounded-lg gap-4 p-4 m-4"
        class:sm:flex-row-reverse={index % 2 == 1}
      >
        <img
          src={project.image}
          class="bg-opacity-50 flex w-40 h-40 items-center justify-center"
          class:bg-neutral-200={!project.image}
          class:p-4={!project.image}
          alt={project.description}
        />

        <div class="flex flex-col flex-1 items-center">
          <h1 class="font-semibold text-3xl">{project.name}</h1>

          <p>Date Started: {project.dateStarted}</p>
          {#if project.dateCompleted}
            <p>Date Completed: {project.dateCompleted}</p>
          {:else}
            <p>Ongoing</p>
          {/if}

          <p class="flex-1 flex items-center justify-center text-left">
            {project.description}
          </p>
        </div>
      </a>
    {/each}
  </div>
</div>
