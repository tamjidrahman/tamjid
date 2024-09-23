export interface Post {
  id: string;
  title: string;
  description: string;
  body: string;
  date: Date;
  tags: string[];
}

export const posts: Post[] = [
  {
    id: "genzql",
    title: "ZQL",
    tags: ["projects", "memes"],
    //href: "https://genzql.com",
    description: "it's giving SQL for GenZ",
    date: new Date(),
    body: "https://genzql.com",
  },
  {
    id: "lammplighter",
    title: "lammplighter",
    tags: ["projects", "research"],
    //href: "https://github.com/tamjidrahman/lammplighter",
    description: "docker for MD simulations",
    date: new Date(),
    body: "",
  },
  {
    id: "letterboxsolver",
    title: "LetterBox Solver",
    date: new Date(),
    body: "",
    tags: ["projects", "games"],
    //href: "https://github.com/tamjidrahman/letterboxsolver",
    description: "solve it once and for all",
  },
  {
    id: "redgates",
    title: "On Red Gates",
    description: "... Coming soon!",
    date: new Date(),
    tags: ["management"],
    body: "Coming soon!",
  },
  {
    id: "ultimatebunny",
    title: "Why the Ultimate Bunny?",
    description: "For the discerning",
    date: new Date(),
    tags: ["memes", "personal"],
    body: "Vinesh says I'm like the ultimate bunny. I don't disagree.",
  },
];
