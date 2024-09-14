<script lang="ts">
  import type { User } from "$lib/admin/types";

  export let data: User;
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<div class="flex flex-1 flex-col items-center justify-center">
  <h1 class="text-4xl text-center text-red-500">Hello, {data.name}</h1>

  <h2 class="text-2xl text-center text-white">Email: {data.email}</h2>
  <h2 class="text-2xl text-center text-white">Batch: {data.batch}</h2>
</div>
