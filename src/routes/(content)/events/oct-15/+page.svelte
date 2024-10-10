<script lang="ts">
  import { quintOut } from "svelte/easing";
  import { fade, fly } from "svelte/transition";

  let name = "";
  let email = "";
  let usn = "";
  let phone = "";

  function registerUser() {
    let body = { name, email, usn, phone };
    status = "loading";
    console.log(body);
    fetch("/events/oct-15/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          status = "error";
        } else {
          status = "success";
          name = "";
          email = "";
          usn = "";
          phone = "";
        }
      })
      .catch((err) => {
        console.error(err);
        status = "error";
      });
  }

  let status: "loading" | "success" | "error" | null = null;
</script>

<svelte:head>
  <title>Register</title>
</svelte:head>

<div
  class="flex flex-col items-center max-w-screen-lg w-full mx-4 mb-4 mt-40 text-xl gap-4 relative"
>
  <h1 class="text-6xl text-center font-bold text-white">Register</h1>

  <form
    class="flex flex-col max-w-screen-lg w-full items-center justify-center p-4"
    on:submit|preventDefault={registerUser}
  >
    <div class="flex flex-col w-full gap-2">
      <label for="name" class="text-white">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        class="w-full p-2 rounded-lg mb-4"
        placeholder="Enter your name"
        bind:value={name}
      />

      <label for="email" class="text-white">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        class="w-full p-2 rounded-lg mb-4"
        placeholder="Enter your email"
        bind:value={email}
      />

      <label
        for="usn"
        class="text-white
        ">USN</label
      >
      <input
        type="text"
        id="usn"
        name="usn"
        class="w-full p-2 rounded-lg mb-4"
        placeholder="Enter your USN"
        bind:value={usn}
      />

      <label for="phone" class="text-white">Phone</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        class="w-full p-2 rounded-lg mb-4"
        placeholder="Enter your phone number"
        bind:value={phone}
      />

      <button
        type="submit"
        class="mt-2 bg-sky-600 hover:bg-sky-700 transition text-white p-2 rounded-lg w-full"
      >
        Submit
      </button>
    </div>
  </form>
</div>

{#if status}
  <div class="fixed inset-0 z-50 flex items-center justify-center transition">
    <button
      transition:fade={{ duration: 150 }}
      on:click={() => {
        if (status !== "loading") status = null;
      }}
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
      <h2 class="text-xl mb-4 font-semibold">
        {#if status === "loading"}
          Registering...
        {:else if status === "success"}
          Registered successfully!
        {:else if status === "error"}
          Failed to register!
        {/if}
      </h2>
    </div>
  </div>
{/if}

<style>
  input {
    @apply bg-neutral-800;
  }
</style>
