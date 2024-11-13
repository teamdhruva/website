<script lang="ts">
  import { ADMIN, isAuthorized, TREASURER } from "$lib/admin/perm";

  interface PartialUser {
    name: string;
    email: string;
    batch: string;
    usn: string;
    created_at: string;
  }

  export let data;

  let searchQuery = "";

  let results: PartialUser[] = data.results as PartialUser[];

  $: filteredData = results
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.batch.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      return a.created_at.localeCompare(b.created_at);
    });
</script>

<svelte:head>
  <title>Recruitment Members</title>
</svelte:head>

<h1 class="text-4xl font-bold text-center p-2">Recruitment Members</h1>

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
        <th> Batch </th>
        <th> Name </th>
        <th> USN </th>
        <th> Email </th>
        <!-- <th class="p-2"> Roles </th> -->
      </tr>
    </thead>
    <tbody class="">
      {#each filteredData as user}
        <tr class="border-b">
          <td class="p-2">{user.batch}</td>
          <td class="p-2">
            {user.name}
          </td>
          <td class="p-2">
            {user.usn}
          </td>
          <td class="p-2">{user.email}</td>
        </tr>
      {/each}
    </tbody>
  </table>
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
