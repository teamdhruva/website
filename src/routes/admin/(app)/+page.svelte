<script lang="ts">
  import type { User } from "$lib/admin/types";

  export let data: User;
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<div class="flex flex-1 flex-col items-center justify-center m-4">
  <h1 class="text-4xl text-center text-red-500">Hello, {data.name}</h1>

  <h2 class="text-2xl text-center text-white">Email: {data.email}</h2>
  <h2 class="text-2xl text-center text-white">Batch: {data.batch}</h2>

  <div class="flex flex-col text-base my-4">
    <p class="flex gap-2">
      <span class="font-semibold">Your permissions:</span>
      {#if data.permissions & 1}
        <span>Admin</span>
      {:else}
        {#if data.permissions & 2}
          Treasurer
        {/if}
        <span class="hidden"></span>
      {/if}
    </p>
  </div>

  <div class="flex flex-col rounded-md my-2 flex-1 w-full bg-opacity-25">
    <div class="flex flex-col gap-4 p-2 items-center">
      <h1 class="text-2xl">Quick Links</h1>

      <a
        href="/admin/services/bills?new=true"
        class="text-blue-400 hover:text-blue-500 transition w-full"
      >
        <button
          class="w-full text-green-400 hover:text-green-500 transition bg-neutral-700 disabled:bg-neutral-600 hover:bg-neutral-800 bg-opacity-50 rounded-md p-2"
        >
          Submit Bill
        </button>
      </a>

      <a
        href="/admin/services/bills"
        class="text-blue-400 hover:text-blue-500 transition w-full"
      >
        <button
          class="w-full text-blue-400 hover:text-blue-500 transition bg-neutral-700 disabled:bg-neutral-600 hover:bg-neutral-800 bg-opacity-50 rounded-md p-2"
        >
          My Bills
        </button></a
      >
    </div>
  </div>
</div>
