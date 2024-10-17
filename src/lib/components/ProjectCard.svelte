<script>
  export let imgSrc;
  export let title;
  export let description;
  export let link;
</script>

<a href={link} class="flex flex-col items-center bg-neutral-800 hover:bg-neutral-700 transition bg-opacity-50 rounded-lg p-6 shadow-md m-4 w-80">
  <div class="flex-1 flex items-center">
    <img src="{imgSrc}" alt="Image of {title}" class="mb-4 rounded-lg" />
  </div>
  <h3 class="text-xl font-semibold mb-2 text-white">{title}</h3>
  <p class="text-sm text-center mb-4 text-white">{description}</p>
  <!-- <button class="btn-action text-white py-2 px-4">{buttonText}</button> -->
</a>
