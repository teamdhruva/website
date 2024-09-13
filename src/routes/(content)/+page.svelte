<script>
  import { browser } from "$app/environment";
  import ProjectCard from "$lib/components/ProjectCard.svelte";

  const projects = [
    {
      imgSrc: "/projects/6-inch.jpg",
      title: "6 inch Telescope",
      description: "Description of Project 1",
      link: "/projects/6-inch-telescope",
    },
    {
      imgSrc: "/newbg.jpeg",
      title: "Astrophotography",
      description: "Description of Project 2",
      link: "/projects/astrophotography",
    },
    {
      imgSrc: "/newbg.jpeg",
      title: "Solar Radio Telescope",
      description: "Description of Project 3",
      link: "/projects/solar-radio-telescope",
    },
  ];
</script>

<svelte:head>
  <title>Team dhRuVa</title>
</svelte:head>

<section class="flex items-center justify-center background h-screen w-full" id="home">
  <div class="box-main max-w-[48rem] flex-1">
    <div class="flex flex-col gap-2 p-4 text-center">
      <p class="text-5xl sm:text-8xl">
        <img
          src="/text_logo.png"
          class="max-sm:h-20 sm:h-48"
          alt="dhRuVa logo"
          id="mainlogo"
        />
      </p>
      <p class="text-xl">The Astrophysics club of RVCE</p>
      <div class="buttons">
        <a
          class="text-lg text-sky-400 transition hover:text-sky-500"
          href="/about">Learn More</a
        >
      </div>
    </div>
    <div class="secondHalf"></div>
  </div>
</section>

<section
  class="secRight bg-neutral-900 min-h-screen h-min flex flex-col items-center justify-center"
  id="projects"
>
  <p class="p-4 text-4xl font-bold text-center text-white mb-8">
    Our Projects
  </p>

  <div class="flex flex-wrap justify-center gap-6">
    {#each projects as project}
      <ProjectCard
        imgSrc={project.imgSrc}
        title={project.title}
        description={project.description}
        link={project.link}
      />
    {/each}
  </div>

  <!-- <div class="mt-8">
    <button
      class="relative bg-black text-white py-2 px-4 rounded border-2 border-white overflow-hidden hover:bg-gray-800 transition duration-300"
    >
      <span
        class="absolute inset-0 bg-gradient-to-t from-white opacity-30 animate-pulse"
      ></span>
      Learn more
    </button>
  </div> -->
</section>

<style>
  @keyframes twinkle {
    0% {
      border-color: rgba(255, 255, 255, 0.3); /* Lighter border color */
      box-shadow: 0 0 5px rgba(255, 255, 255, 0.5); /* Lighter shadow */
    }
    50% {
      border-color: rgba(255, 255, 255, 0.8); /* Medium border color */
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.8); /* Medium shadow */
    }
    100% {
      border-color: rgba(255, 255, 255, 0.3); /* Lighter border color */
      box-shadow: 0 0 5px rgba(255, 255, 255, 0.5); /* Lighter shadow */
    }
  }

  .animate-twinkle {
    animation: twinkle 3s infinite; /* Apply the twinkle animation */
  }
</style>
