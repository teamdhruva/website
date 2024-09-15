<svelte:head>
  <title>
    Events
  </title>
</svelte:head>

<div
  class="flex flex-col items-center max-w-screen-lg w-full mx-4 mb-4 mt-40 text-xl gap-4 relative"
>
  <h1 class="text-6xl text-center font-bold text-white">Events</h1>

  <div class="flex flex-col max-w-screen-lg w-full">
    <a
      href={`/events/`}
      class="flex-col max-sm:items-center bg-neutral-800 hover:bg-neutral-700 bg-opacity-50 hover:bg-opacity-50 transition rounded-lg gap-4 p-4 m-4"
    >
      <h1 class="font-semibold text-3xl text-center mb-4">
        Stargazing Spectacles
      </h1>

      <div class="flex flex-row flex-wrap justify-center items-center gap-4">
        <!-- <img
          src="/favicon.ico"
          class="p-4 bg-neutral-200 bg-opacity-50 flex w-40 h-40 items-center justify-center"
          alt="example image"
        />
        <img
          src="/favicon.ico"
          class="p-4 bg-neutral-200 bg-opacity-50 flex w-40 h-40 items-center justify-center"
          alt="example image"
        />
        <img
          src="/favicon.ico"
          class="p-4 bg-neutral-200 bg-opacity-50 flex w-40 h-40 items-center justify-center"
          alt="example image"
        /> -->
      </div>

      <div class="flex flex-col flex-1 items-center">
        <!-- <p>Date Started: {project.dateStarted}</p>
          {#if project.dateCompleted}
            <p>Date Completed: {project.dateCompleted}</p>
          {:else}
            <p>Ongoing</p>
          {/if}

          <p class="flex-1 flex items-center justify-center text-left">
            {project.description}
          </p> -->
      </div>
    </a>
  </div>
</div>
