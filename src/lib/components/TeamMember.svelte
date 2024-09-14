<script lang="ts">
  import type { TeamMember } from "$lib";

  export let member: TeamMember;
  $: image = member.image != null ? member.image : "/team/nopfp.jpg";
</script>

<a href={member.link ? `/members/${member.link}` : ""} class="inline-block flex-row w-64 h-80 bg-neutral-800 hover:bg-neutral-700 transition rounded-md m-4 p-2">
  <div class="flex flex-col items-center gap-2 h-full">
    <img class="flex items-center justify-center rounded-full w-40 h-40 border-4" src={image} alt={member.name} />
    <h2 class="flex items-center text-2xl flex-1 font-bold text-white">{member.name}</h2>
    <p class="text-center text-white">{member.role}</p>
  </div>
</a>
