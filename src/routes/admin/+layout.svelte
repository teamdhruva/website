<style>
  .bruh {
    background: rgba(0, 0, 0, 0.7) url('/internal/intbg.png');
    background-blend-mode: darken;
    
    @apply bg-fixed bg-center
  }
</style>

<div class="min-h-screen flex items-center justify-center w-full bruh">
  <slot />
</div>
