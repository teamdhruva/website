<script lang="ts">
  import json from '$lib/recruitment/interview_round.json';

  const departments: Record<string, string> = {
    ae: "Aerospace Engineering",
    bt: "Biotechnology",
    cd: "Computer Science (Data Science)",
    cy: "Computer Science (Cyber Security)",
    ai: "Artificial Intelligence",
    cs: "Computer Science",
    ec: "Electronics and Communication",
    cv: "Civil Engineering",
    ee: "Electrical and Electronics",
    im: "Industrial Engineering and Management",
    me: "Mechanical Engineering",
    is: "Information Science",
    et: "Electronics and Telecommunication",
    ch: "Chemical Engineering",
  };

  // Expand departments with full names
  const expandedResults = {
    first: Object.fromEntries(
      Object.entries(json.first).map(([code, names]) => [departments[code] || code, names]).map(([code, names]) => {
        // Sort names alphabetically
        names.sort((a, b) => a.localeCompare(b));
        return [code, names];
      })
    ),
    third: Object.fromEntries(
      Object.entries(json.third).map(([code, names]) => [departments[code] || code, names]).map(([code, names]) => {
        // Sort names alphabetically
        names.sort((a, b) => a.localeCompare(b));
        return [code, names];
      })
    )
  };

  function titleCase(str: string) {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }
</script>

<svelte:head>
  <title>Interview Selects</title>
</svelte:head>

<div
  class="flex flex-col items-center justify-center min-h-screen mt-24 text-white px-6"
>
  <h1 class="text-4xl sm:text-5xl font-bold mb-6 mt-16 text-center">Interview Selects</h1>
  <h2 class="text-xl sm:text-2xl font-semibold mb-6 text-center">Check your email for more information!</h2>

  <div class="w-full max-w-6xl">
    <!-- Combined First and Third Years -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {#each Object.entries(expandedResults.first) as [department, firstYearNames]}
        <div class="bg-neutral-800 p-4 rounded-lg shadow-lg">
          <h3 class="text-xl font-semibold mb-2 text-red-400">{department}</h3>
          
          <!-- First Years -->
          <div class="mb-4">
            <h4 class="font-semibold text-white">1st Semester</h4>
            <ul class="list-disc pl-5 space-y-1 text-gray-300">
              {#each firstYearNames as name}
                <li>{titleCase(name)}</li>
              {/each}
            </ul>
          </div>

          <!-- Third Years -->
          {#if expandedResults.third[department]}
            <div>
              <h4 class="font-semibold text-neutral-300">3rd Semester</h4>
              <ul class="list-disc pl-5 space-y-1 text-neutral-300">
                {#each expandedResults.third[department] as name}
                  <li>{titleCase(name)}</li>
                {/each}
              </ul>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>
