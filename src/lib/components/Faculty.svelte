<script lang="ts">
    import type {Faculty} from "$lib";
    export let fac:Faculty;
    $: imag= fac.image!=null ? fac.image : "/team/nopfp.jpg";
    $:link=fac.link!=null? fac.link :"/";
  </script>
  
  <a href="/" class="inline-block flex-row w-64 h-80 bg-neutral-800 hover:bg-neutral-700 transition rounded-md m-4 p-2">
    <div class="flex flex-col items-center gap-2 h-full">
      <a href={link}><img class="flex items-center justify-center rounded-full w-40 h-40 border-4" src={imag} alt={fac.name} /></a>
      <h2 class="flex items-center text-2xl flex-1 font-bold text-white">{fac.name}</h2>
    </div>
  </a>
  