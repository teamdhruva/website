<script lang="ts">
  import type { User } from "$lib/admin/types";

  export let data: User
</script>

<div class="flex flex-1 flex-col items-center regular-bg min-h-screen">
  <h1 class="text-4xl text-center text-red-500">Hello {data.name} from {data.batch}</h1>
</div>
