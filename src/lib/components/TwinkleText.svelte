<span class="contents twinkling-text">
  <slot />
</span>

<style>
  @keyframes twinkling {
    0% {
      color: #fff;
    }
    50% {
      color: #329ba8;
    }
    100% {
      color: #fff;
    }
  }

  .twinkling-text {
    animation: twinkling 2s linear infinite;
  }
</style>
