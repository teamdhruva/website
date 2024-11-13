<script lang="ts">
  import { page } from "$app/stores";
  import type { RecruitmentUser } from "$lib/recruitment";

  const origin = $page.url.origin;

  export let data;

  let user = data.user as RecruitmentUser;
  let email = data.email;

  $: exists = user?.email !== undefined;

  let name: string;
  let usn: string;
  let batch: string;

  let error: string;
  let disabled: boolean;

  async function onSubmit() {
    if (!name || !usn || !batch) {
      error = "Please fill in all fields.";
      return;
    }

    disabled = true;

    let body = {
      name,
      usn,
      batch,
    };

    let res = await fetch(`${origin}/api/recruitment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      let out = await res.json();
      data = out;
      disabled = false;
    } else {
      error = "An error occurred. Please try again.";
      disabled = false;
    }
  }

  async function onDelete() {
    disabled = true;
    let res = await fetch(`${origin}/api/recruitment`, {
      method: "DELETE",
    });

    if (res.ok) {
      data = {};
      disabled = false;
    } else {
      error = "An error occurred. Please try again.";
      disabled = false;
    }
  }
</script>

<svelte:head>
  <title>Recruitment Form</title>

  <meta property="og:title" content="Team dhRuVa" />
  <meta
    property="og:description"
    content="Join us! Team dhRuVa is recruiting!"
  />
  <meta property="og:url" content="https://teamdhruva.com/recruitment" />
  <meta property="og:type" content="website" />

  <script src="https://accounts.google.com/gsi/client" async></script>
</svelte:head>

<div
  class="flex flex-col items-center justify-center min-h-screen mt-32 text-white px-6"
>
  <h1 class="text-4xl sm:text-5xl font-bold mb-4 text-center">
    Recruitment Form
  </h1>

  <div class="w-full max-w-4xl bg-neutral-800 p-6 rounded-lg shadow-lg">
    <h2 class="text-3xl font-semibold text-yellow-300 mb-4">
      Recruitment Test
    </h2>
    <table class="table-auto w-full text-left text-gray-300 mb-6">
      <tbody>
        <tr>
          <td class="py-2 px-4">📅 <span class="text-white">Date</span></td>
          <td class="py-2 px-4">November 23, 2024</td>
        </tr>
        <tr class="bg-gray-700">
          <td class="py-2 px-4">⏰ <span class="text-white">Time</span></td>
          <td class="py-2 px-4">pls tell me</td>
        </tr>
        <tr>
          <td class="py-2 px-4">📍 <span class="text-white">Venue</span></td>
          <td class="py-2 px-4">DTL Huddle</td>
        </tr>
      </tbody>
    </table>

    <p class="mb-2">Logged in as <span class="font-mono">{email}</span>. 
      <a class="text-red-500 hover:text-red-600 transition"
      href="/recruitment/logout">Log out</a>
    </p>

    {#if !exists}
      <p class="mb-2">You are not registered. Please fill out the form below.</p>
      <h2 class="text-2xl text-center">Register now</h2>
      <form
        class="flex flex-col items-center mt-3 mb-6"
        on:submit|preventDefault={onSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          class="w-full bg-neutral-700 p-2 rounded-lg mb-2"
          bind:value={name}
        />

        <input
          type="text"
          name="usn"
          placeholder="USN"
          class="w-full bg-neutral-700 p-2 rounded-lg mb-2"
          bind:value={usn}
        />

        <label for="batch" class="text-white"> Batch </label>
        <select
          name="batch"
          class="w-full bg-neutral-700 p-2 rounded-lg mb-2"
          bind:value={batch}
        >
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>

        {#if error}
          <p class="text-red-500 mb-2">{error}</p>
        {/if}

        <button
          type="submit"
          disabled={disabled}
          class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition p-2"
        >
          Register
        </button>
      </form>
    {:else}
      <p>
        You've already registered for the recruitment test. We look forward to
        seeing you there!
      </p>

      <h2 class="text-2xl text-center">Details</h2>
      <table class="table-auto w-full text-left text-gray-300 mb-6">
        <tbody>
          <tr>
            <td class="py-2 px-4">Name</td>
            <td class="py-2 px-4">{user.name}</td>
          </tr>
          <tr>
            <td class="py-2 px-4">USN</td>
            <td class="py-2 px-4">{user.usn}</td>
          </tr>
          <tr>
            <td class="py-2 px-4">Batch</td>
            <td class="py-2 px-4">{user.batch}</td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-around">
        <button
          on:click={onDelete}
          disabled={disabled}
          class="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition p-2"
        >
          Unregister
        </button>
      </div>
    {/if}
  </div>

  <p class="mt-10 text-gray-400">We look forward to seeing you there!</p>
</div>
