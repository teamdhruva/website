<script>
  import Instagram from "$lib/icons/Instagram.svelte";

  import YouTube from "$lib/icons/YouTube.svelte";


  import TwinkleText from "./TwinkleText.svelte";

</script>
<footer class="bg-gray-800 text-white py-8" id="contact">
  <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
    <!-- Left section: Logo  -->
    <div class="col-span-1 md:col-span-2">
      <h2 class="text-5xl font-bold mb-4">
        <TwinkleText>Team Dhruva</TwinkleText>
      </h2>
      <p class="mb-4">
        RV COLLEGE OF ENGINEERING

        <br />MYSURU ROAD

        <br />BENGALURU - 560059, INDIA.
      </p>
      <p>
        Write to us at: <a href="mailto:contact@teamdhruva.com"
          >contact@teamdhruva.com</a
        >
      </p>
    </div>

    <!-- Middle section: Quick links -->
    <div class="col-span-1">
      <h3 class="text-2xl font-semibold mb-4">Quick Links</h3>
      <ul class="space-y-2">
        <li><a href="#" class="text-white transition hover:text-sky-500">About</a></li>
        <li><a href="#" class="text-white transition hover:text-sky-500">Calender of Events</a></li>
        <li><a href="#" class="text-white transition hover:text-sky-500">Projects</a></li>
        <li><a href="#" class="text-white transition hover:text-sky-500">Blog</a></li>
      </ul>
    </div>

    <!-- Right section: Social media and newsletter -->
    <div class="col-span-1">
      <h3 class="text-lg font-semibold mb-2">Follow Us</h3>
      <div class="flex space-x-4">
        <a
          href="https://www.instagram.com/dhruva_rvce/"
          class="flex items-center justify-center w-10 h-10 bg-gray-900 rounded-full"
        >
          <Instagram />
        </a>
        <a
          href="https://www.youtube.com/@dhruva1910"
          class="flex items-center justify-center w-10 h-10 bg-gray-900 rounded-full"
        >
          <YouTube />
        </a>
      </div>

      <form class="mt-4">
        <p>Subscribe to join our Constellation!!</p>
        <input
          type="email"
          placeholder="Enter your email"
          class="p-2 bg-neutral-700 border border-gray-300 rounded-l-md focus:outline-none"
        />
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-600 text-BLACK px-4 py-2 rounded-r-md"
          >Subscribe</button
        >
      </form>
    </div>
  </div>
</footer>
