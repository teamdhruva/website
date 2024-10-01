<script lang="ts">
  import { ProgressBar } from "@prgm/sveltekit-progress-bar";
</script>

<ProgressBar class="text-red-500" />

<div class="min-h-screen flex items-center justify-center w-full bruh">
  <slot />
</div>

<style>
  .bruh {
    background: rgba(0, 0, 0, 0.85) url("/internal/intbg.png");
    background-blend-mode: darken;

    @apply bg-fixed bg-center;
  }
</style>
