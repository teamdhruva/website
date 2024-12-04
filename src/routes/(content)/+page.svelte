<script>
  import ProjectCard from "$lib/components/ProjectCard.svelte";

  const projects = [
    {
      imgSrc: "/projects/6-inch.webp",
      title: "6 inch Telescope",
      description: "Our in-house built reflecting telescope",
      link: "/projects/6-inch-telescope",
    },
    {
      imgSrc: "/projects/moon.webp",
      title: "Astrophotography",
      description: "Taking pictures of the night sky",
      link: "/projects/astrophotography",
    },
    {
      imgSrc: "/projects/solar-radio.webp",
      title: "Solar Radio Telescope",
      description: "Observing the sun's radio emissions",
      link: "/projects/solar-radio-telescope",
    },
  ];

  // Event cards data
  const events = [
    {
      imgSrc: "/events/astronomy-workshop.png",
      title: "Astronomy Workshop",
      description:
        "Hands-on data manipulation, astronomy analysis, and machine learning.",
      link: "/events/oct-dda",
    },
    {
      imgSrc: "/events/einstein-lectures-logo.png",
      title: "Einstein Lectures",
      description:
        "Explore the life and contributions of Chandrasekhar with Rajaram Nityananda.",
      link: "/events/oct-29",
    },
  ];
</script>

<svelte:head>
  <title>Team dhRuVa</title>
</svelte:head>

<section
  class="flex items-center justify-center background h-screen w-full"
  id="home"
>
  <div class="box-main max-w-[48rem] flex-1">
    <div class="flex flex-col gap-2 p-4 text-center">
      <p class="text-5xl sm:text-8xl">
        <img
          src="/text_logo.webp"
          class="max-sm:h-20 sm:h-48"
          alt="dhRuVa logo"
          id="mainlogo"
        />
      </p>
      <p class="text-xl">The Astrophysics club of RVCE</p>
      <div class="buttons">
        <a
          class="text-lg text-sky-400 transition hover:text-sky-500"
          aria-label="Learn more about Team dhRuVa"
          href="/about">About Us</a
        >
      </div>
    </div>
    <div class="secondHalf"></div>
  </div>
</section>

<div class="my-10">
  <h2 class="p-4 text-4xl font-bold text-center text-white mb-8">Vision</h2>
  <p class="max-w-screen-lg text-xl text-justify p-2">
    To foster a community of students passionate about astrophysics and
    astronomy, and provide them with the resources and opportunities to explore
    and learn about the cosmos.
  </p>
</div>

<section class=" py-10">
  <h2 class="p-4 text-4xl font-bold text-center text-white mb-8">
    Recruitment
  </h2>

  <p>
    Interview selections for the 2024 recruitment cycle are out! Check it out at
    our <a
      class="text-blue-400 hover:text-blue-500 transition"
      href="/recruitment">Recruitment page</a
    >.
  </p>
</section>

<section
  class="secRight bg-neutral-900 my-10 h-min flex flex-col items-center justify-center"
  id="projects"
>
  <p class="p-4 text-4xl font-bold text-center text-white mb-8">Our Projects</p>

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

  <div class="mt-8">
    <a
      href="/about"
      class="text-blue-400 hover:text-blue-500 text-2xl transition"
      aria-label="Learn more about Team dhRuVa"
    >
      About Team dhRuVa
    </a>
  </div>
</section>
