<script>
  export let imgSrc;
  export let title;
  export let description;
  export let buttonText = "Learn More";
</script>

<div class="flex flex-col items-center bg-black rounded-lg p-6 shadow-md border border-white m-4 w-80">
  <img src="{imgSrc}" alt="Image of {title}" class="mb-4 rounded-lg" />
  <h3 class="text-xl font-semibold mb-2 text-white">{title}</h3>
  <p class="text-sm text-center mb-4 text-white">{description}</p>
  <button class="btn-action text-white py-2 px-4">{buttonText}</button>
</div>
