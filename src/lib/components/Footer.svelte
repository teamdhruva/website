<script>
  import Instagram from "$lib/icons/Instagram.svelte";
  import LinkedIn from "$lib/icons/LinkedIn.svelte";
  import YouTube from "$lib/icons/YouTube.svelte";
</script>

<footer class="bg-neutral-900 text-white pt-12 pb-6" id="contact">
  <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
    <!-- Left section: Logo and address -->
    <div class="space-y-6">
      <h1
        class="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-sky-500"
      >
        Team Dhruva
      </h1>
      <p>
        RV College of Engineering<br />
        8th Mile, Mysuru Road<br />
        Bengaluru - 560059, India
      </p>
      <p>
        Write to us at:
        <a
          href="mailto:contact@teamdhruva.com"
          class="text-sky-500 hover:underline">contact@teamdhruva.com</a
        >
      </p>
      <div>
        <h2 class="text-lg font-semibold">Follow Us</h2>
        <div class="flex space-x-4 mt-2">
          <a
            href="https://www.linkedin.com/company/dhruva-astronomy"
            class="flex items-center justify-center w-10 h-10 bg-neutral-800 rounded-full hover:bg-neutral-700 transition"
            aria-label="Team dhRuVa LinkedIn"
          >
            <LinkedIn />
          </a>

          <a
            href="https://www.instagram.com/dhruva_rvce/"
            class="flex items-center justify-center w-10 h-10 bg-neutral-800 rounded-full hover:bg-neutral-700 transition"
            aria-label="Team dhRuVa Instagram"
          >
            <Instagram />
          </a>

          <a
            href="https://www.youtube.com/@dhruva1910"
            class="flex items-center justify-center w-10 h-10 bg-neutral-800 rounded-full hover:bg-neutral-700 transition"
            aria-label="Team dhRuVa YouTube Channel"
          >
            <YouTube />
          </a>
        </div>
      </div>
    </div>

    <!-- Middle section: Quick links -->
    <div class="space-y-6">
      <h2 class="text-2xl font-semibold">Quick Links</h2>
      <div class="grid grid-cols-2 md:grid-cols-1 gap-2">
        <span>
          <a href="/about" class="text-white transition hover:text-sky-500"
            >About</a
          >
        </span>
        <span>
          <a href="/projects" class="text-white transition hover:text-sky-500"
            >Projects</a
          >
        </span>
        <!-- <span>
          <a href="/events" class="text-white transition hover:text-sky-500"
            >Events</a
          >
        </span> -->
        <span>
          <a href="/blog" class="text-white transition hover:text-sky-500"
            >Blog</a
          >
        </span>
        <span>
          <a href="/admin" class="text-white transition hover:text-sky-500"
            >Admin</a
          >
        </span>
      </div>
    </div>

    <!-- Right section: Subscribe -->
    <div class="space-y-6">
      <h2 class="text-2xl font-semibold">
        Subscribe to join our Constellation!
      </h2>
      <form class="space-y-4">
        <div class="flex">
          <input
            type="email"
            placeholder="Enter your email"
            class="p-3 bg-neutral-800 border border-gray-700 rounded-l-md focus:outline-none flex-grow text-white"
          />
          <button
            type="submit"
            class="bg-sky-500 hover:bg-sky-600 text-black px-4 py-2 rounded-r-md"
          >
            Subscribe
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Copyright Notice -->
  <div class="text-center mt-4">
    <p class="text-neutral-400">
      &copy; {new Date().getFullYear()} Team Dhruva | Licensed under the
      <a
        href="https://opensource.org/licenses/MIT"
        class="text-sky-500 hover:underline"
        target="_blank"
        rel="noopener noreferrer">MIT License</a
      >.
    </p>
  </div>
</footer>
