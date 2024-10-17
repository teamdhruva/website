<script lang="ts">
  import type { User } from "$lib/admin/types";

  export let data: User;
</script>

<svelte:head>
  <title>{data.name}</title>
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-screen">
  <h1 class="text-4xl">
    {data.name}
  </h1>

  <h2 class="textl-xl">
    Batch: {data.batch}
  </h2>
</div>
