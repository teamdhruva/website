<script lang="ts">
  import { ADMIN, isAuthorized, TREASURER } from "$lib/admin/perm";

  interface PartialUser {
    name: string;
    email: string;
    batch: string;
    permissions: number;
    slug: string;
  }

  export let data;

  let results: PartialUser[] = data.results as PartialUser[];

  // State variables for search and sorting
  let searchQuery = "";
  let sortBy: "name" | "batch" | "email" = "name";
  let sortAsc = true;

  $: filteredData = results
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.batch.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      const fieldA = a[sortBy].toLowerCase();
      const fieldB = b[sortBy].toLowerCase();
      if (sortAsc) return fieldA.localeCompare(fieldB);
      return fieldB.localeCompare(fieldA);
    });

  // Function to toggle sorting direction
  function toggleSort(field: "name" | "batch" | "email") {
    if (sortBy === field) {
      sortAsc = !sortAsc;
    } else {
      sortBy = field;
      sortAsc = true;
    }
  }
</script>

<svelte:head>
  <title>All Members</title>
</svelte:head>

<h1 class="text-4xl font-bold text-center p-2">Club Members</h1>

<!-- Search Box -->
<div class="flex justify-center mb-4 p-2">
  <input
    type="text"
    placeholder="Search..."
    bind:value={searchQuery}
    class="border border-gray-300 text-white bg-neutral-800 rounded-md m-2 p-2 w-full"
  />
</div>

<!-- Table Layout -->
<div class="overflow-x-auto m-2">
  <table class="table-auto text-center border-collapse w-full">
    <thead class="bg-neutral-700 bg-opacity-50 text-white">
      <tr>
        <th class="p-2 cursor-pointer" on:click={() => toggleSort("batch")}>
          Batch {sortBy === "batch" ? (sortAsc ? "↑" : "↓") : ""}
        </th>
        <th class="p-2 cursor-pointer" on:click={() => toggleSort("name")}>
          Name {sortBy === "name" ? (sortAsc ? "↑" : "↓") : ""}
        </th>
        <th class="p-2 cursor-pointer" on:click={() => toggleSort("email")}>
          Email {sortBy === "email" ? (sortAsc ? "↑" : "↓") : ""}
        </th>
        <!-- <th class="p-2"> Roles </th> -->
      </tr>
    </thead>
    <tbody class="">
      {#each filteredData as user}
        <tr class="border-b">
          <td class="p-2">{user.batch}</td>
          <td class="p-2">
            <a
              href={`/member/${user.slug}`}
              class="hover:underline"
              class:text-white={user.permissions === 0}
            >
              {user.name}
            </a>
          </td>
          <td class="p-2">{user.email}</td>
          <!-- <td>
            {#if isAuthorized(user, ADMIN)}
              🔑
            {/if}
            {#if isAuthorized(user, TREASURER)}
              💸
            {/if}
          </td> -->
        </tr>
      {/each}
    </tbody>
  </table>

  <!-- <div class="flex flex-col items-center mt-8">
    <div class="flex flex-col">
      <span class="text-center text-lg">Legend</span>
      <span>💸 Treasurer</span>
      <span>🔑 Admin</span>
    </div>
  </div> -->
</div>

<style>
  a {
    text-decoration: none;
  }
  th,
  td {
    text-align: center;
  }
</style>
