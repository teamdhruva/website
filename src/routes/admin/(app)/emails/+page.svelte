<script lang="ts">
  import type { EmailRoutingRule } from "cloudflare/resources/email-routing/rules/rules.mjs";

  export let data;

  let rules: EmailRoutingRule[] = data.rules;
  let users: { name: string; email: string;}[] = data.users;

  function getUserName(email: string) {
    return users.find((user) => user.email === email)?.name || email;
  }

  console.log(getUserName("shrishvd.cy23@rvce.edu.in"))
</script>

<svelte:head>
  <title>Custom Emails</title>
</svelte:head>

<h1 class="text-4xl font-bold text-center p-2">Custom Email Addresses</h1>

<div class="flex-1 flex flex-col items-center justify-center gap-4 p-4">
  {#each rules as rule}
    <div class="flex sm:flex-row max-sm:flex-col sm:flex-wrap justify-between w-full max-w-screen-md bg-neutral-800 shadow-md rounded-md p-4 border">
      
      <div class="flex-col mb-2 sm:basis-1/2">
        {#each rule.matchers as matcher}
          {#if matcher.type === "literal"}
            <a class="text-blue-400 hover:text-blue-500" href={`mailto:${matcher.value}`}>
              {matcher.value}
            </a>
            
          {:else if matcher.type === "all"}
            <p class="text-neutral-400">All other addresses</p>
          {/if}
        {/each}
      </div>

      <div class="flex-col mb-2 sm:basis-1/2">
        {#each rule.actions as action}
          {#if action.type === "forward"}
            {#each action.value as value}
            <p>
              Forward to 
              <a class="text-blue-400 hover:text-blue-500" href={`mailto:${value}`}>
                {getUserName(value)}
              </a>
            </p>
            {/each}
          {:else if action.type === "drop"}
            <p class="text-neutral-400">Ignore</p>
          {/if}
        {/each}
      </div>

      <div class="flex justify-end w-full">
        <button class="text-red-400 hover:text-red-500 transition rounded-md">
          Edit
        </button>
      </div>
    </div>
  {/each}

  <button class="text-red-400 hover:text-red-500 transition bg-neutral-700 hover:bg-neutral-800 bg-opacity-50 rounded-md p-2">
    Add New Rule
  </button>
</div>
