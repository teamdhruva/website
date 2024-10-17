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
  <h1 class="text-6xl text-center font-bold text-white">The form has closed. Thank you for being a part of this event!</h1>
</div>
