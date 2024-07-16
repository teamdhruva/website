<script>
  import ProjectCard from "$lib/components/ProjectCard.svelte";

  const projects = [
    {
      imgSrc: "/newbg.jpeg",
      title: "10 inch Telescope",
      description: "Description of Project 1",
    },
    {
      imgSrc: "/newbg.jpeg",
      title: "Astrophotography",
      description: "Description of Project 2",
    },
    {
      imgSrc: "/newbg.jpeg",
      title: "Solar Radio Telescope",
      description: "Description of Project 3",
    },
  ];
</script>

<section class="flex items-center justify-center background h-screen" id="home">
  <div class="box-main max-w-[48rem] flex-1">
    <div class="max-w-96 p-4">
      <p class="text-big">Team Dhruva</p>
      <p class="text-small">Where curiosity meets the cosmos</p>
      <div class="buttons">
        <button class="btn-initial">
          <a class="top1" href="https://www.youtube.com/@dhruva1910"
            >Watch video</a
          ></button
        >
      </div>
    </div>
    <div class="secondHalf"></div>
    <img class="space max-sm:hidden" src="/newbg.jpeg" alt="telescope" />
  </div>
</section>

<section
  class="secRight min-h-screen h-min flex flex-col items-center justify-center"
  id="projects"
>
  <p class="p-4 text-big font-bold text-center text-white mb-8">PROJECTS</p>

  <div class="flex flex-wrap justify-center gap-6">
    {#each projects as project}
      <ProjectCard
        imgSrc={project.imgSrc}
        title={project.title}
        description={project.description}
      />
    {/each}
  </div>

  <div class="mt-8">
    <button
      class="relative bg-black text-white py-2 px-4 rounded border-2 border-white overflow-hidden hover:bg-gray-800 transition duration-300"
    >
      <span
        class="absolute inset-0 bg-gradient-to-t from-white opacity-30 animate-pulse"
      ></span>
      EXPLORE
    </button>
  </div>
</section>

<section class="secRight min-h-screen h-min" id="about">
  <div class="paras">
    <p class="p-4 text-big font-bold text-center">ABOUT US</p>
    <div
      class="flex flex-col gap-4 border border-white rounded-lg p-6 animate-twinkle"
    >
      <p class="Content italic font-size:20px text-xl">
        We are stardust brought to life, then empowered by the universe to
        figure itself out—and we have only just begun.- Neil deGrasse Tyson,
      </p>
      <p class="text-wrap text-base">
        Dhruva is the astrophysics club at R V College of engineering that
        comprises an interdisciplinary team working towards understanding our
        universe better. What began as a quest to explore the secrets of the
        universe is now a growing team of amateur astrophysics enthusiasts. Like
        dhruva, the pole star, we at dhruva also constantly try to keep up with
        the happenings of the universe and events affecting earth through our
        telescopes, radio telescopes and analysis.
      </p>
      <p>
        We host star-grazing events, astrophysics related coding competitions
        and engage in impactful discussions on latest observations made by the
        astrophysics community across the globe. We also believe in sharing our
        understanding with fellow astrophysics enthusiasts through our
        informative videos, blogs and journals.
      </p>
      <p>
        We have also delved into astrophotography for freezing the marvelous
        frames that the universe itself paints! We collaborate with ABBA and
        other student astrophysics clubs for organizing interactive sessions and
        better outreach.
      </p>
      <p>
        We at dhruva try to make astrophysics fun for us and everyone around!
      </p>
    </div>
  </div>
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
