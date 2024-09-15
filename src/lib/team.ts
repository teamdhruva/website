export interface TeamMember {
    name: string;
    role: string;
    linkedin: string | null;
    instagram: string | null;
    image: string | null;
    link: string | null;
}

export interface Faculty {
    name: string;
    linkedin: string | null;
    image: string | null;
    link: string | null;
}

// Aryan - Team Captain
// Khushi - Team Captain
// Sunil - Technical Lead
// Aditi - PR Lead
// Shashank - Optical Head
// Vinay - Optical Head
// Rohith - Radio Head
// Harshhitha - Radio Head
// Aneesh - DDA Head
// Sanjan - DDA Head
// M P Akash - Research Head
// Abhishek - Event Management Head
export const teamMembers: TeamMember[] = [
    {
        name: "Aryan",
        role: "Team Captain",
        linkedin: null,
        instagram: null,
        image: "/team/core/aryan.jpg",
        link: "aryan-namboodiri",
    },
    {
        name: "Khushi",
        role: "Team Captain",
        linkedin: null,
        instagram: null,
        image: "/team/core/khushi.jpg",
        link: "khushi-ligade",
    },
    {
        name: "Sunil",
        role: "Technical Lead",
        linkedin: null,
        instagram: null,
        image: "/team/core/sunil.jpg",
        link: "sunil-joshi",
    },
    {
        name: "Aditi",
        role: "PR Lead",
        linkedin: null,
        instagram: null,
        image: "/team/core/aditi.jpg",
        link: "aditi-n-pai",
    },
    {
        name: "Shashank",
        role: "Optical Head",
        linkedin: null,
        instagram: null,
        image: "/team/core/shashank.jpg",
        link: null,
    },
    {
        name: "Vinay",
        role: "Optical Head",
        linkedin: null,
        instagram: null,
        image: "/team/core/vinay.jpg",
        link: null,
    },
    {
        name: "Rohith",
        role: "Radio Head",
        linkedin: null,
        instagram: null,
        image: "/team/core/rohith.jpg",
        link: "rohith-gowda-m",
    },
    {
        name: "Harshhitha",
        role: "Radio Head",
        linkedin: null,
        instagram: null,
        image: "/team/core/harshhitha.jpg",
        link: null,
    },
    {
        name: "Aneesh",
        role: "DDA Head",
        linkedin: null,
        instagram: null,
        image: "/team/core/aneesh.jpg",
        link: null,
    },
    {
        name: "Sanjan",
        role: "DDA Head",
        linkedin: null,
        instagram: null,
        image: null,
        link: null,
    },
    {
        name: "M P Akash",
        role: "Research Head",
        linkedin: null,
        instagram: null,
        image: "/team/core/akash.jpg",
        link: null,
    },
    {
        name: "Abhishek",
        role: "Event Management Head",
        linkedin: null,
        instagram: null,
        image: null,
        link: null,
    },
];


export const facultymembers: Faculty[]=[
    {
        name: "Dr. Karthik Shastry",
        linkedin:  null,
        image: "team/faculty/kathik_sir.jpeg",
        link: "https://rvce.edu.in/ph-faculty-ks"
    },
    {
        name: "Dr. Venugopal K",
        linkedin:  null,
        image: "team/faculty/venugopal_sir.png",
        link: "https://rvce.edu.in//math-venugopal"
    }
]
