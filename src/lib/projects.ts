export interface Project {
    name: string;
    slug: string;
    image?: string;
    description: string;
    dateStarted: string;
    dateCompleted?: string;
}

export const projects: Project[] = [
    {
        name: "6\" Reflecting Telescope",
        slug: "6-inch-telescope",
        description: "A 6 inch telescope, built from scratch.",
        dateStarted: "March 2024",
    },
    {
        name: "Astrophotography",
        slug: "astrophotography",
        description: "Photography of celestial objects.",
        dateStarted: "March 2024",
    },
    {
        name: "Solar Radio Telescope",
        slug: "solar-radio-telescope",
        description: "A radio telescope to observe the sun.",
        dateStarted: "February 2024",
    },
    {
        name: "21 cm Radio Telescope",
        slug: "21cm-radio-telescope",
        description: "A radio telescope to observe the 21 cm hydrogen line.",
        dateStarted: "April 2024",
    },
    {
        name: "LIGO",
        slug: "ligo",
        description: "A project to analyze gravitational waves.",
        dateStarted: "January 2024",
    },
    {
        name: "Nanograv",
        slug: "nanograv",
        description: "A project to analyze gravitational waves.",
        dateStarted: "January 2024",
    },
    {
        name: "Star Cluster Analysis",
        slug: "star-cluster-analysis",
        description: "Finding anomalies in star clusters.",
        dateStarted: "July 2024",
    },
    {
        name: "2\" Refracting Telescope",
        slug: "2-inch-telescope",
        description: "A 2 inch telescope, built from scratch.",
        dateStarted: "2021",
        dateCompleted: "2022",
    }
];
