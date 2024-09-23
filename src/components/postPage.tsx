import { Badge } from "./ui/badge";

export interface Post {
  id: string;
  title: string;
  description: string;
  date: Date;
  tags: string[];
}
export function PostPage({
  children,
  post,
}: {
  children: React.ReactNode;
  post: Post;
}) {
  const formattedDate = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
  }).format(post.date);

  return (
    <>
      <h1 className="text-primary text-4xl">{post.title}</h1>
      <div className="space-x-1">
        {post.tags.map((tag) => (
          <a href={`/posts/?tag=${tag}`} key={tag}>
            <Badge key={tag}>{tag}</Badge>
          </a>
        ))}
      </div>
      <h2 className="text-secondary mt-2">{post.description}</h2>
      <div className="text-accent mt-2">{formattedDate}</div>
      <div className="max-w-[88ch] py-10">{children}</div>
    </>
  );
}

export const posts: Post[] = [
  {
    id: "genzql",
    title: "ZQL",
    tags: ["projects", "memes"],
    //href: "https://genzql.com",
    description: "it's giving SQL for GenZ",
    date: new Date(),
  },
  {
    id: "lammplighter",
    title: "lammplighter",
    tags: ["projects", "research"],
    //href: "https://github.com/tamjidrahman/lammplighter",
    description: "docker for MD simulations",
    date: new Date(),
  },
  {
    id: "letterboxsolver",
    title: "LetterBox Solver",
    date: new Date(),
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
  },
  {
    id: "ultimatebunny",
    title: "Why the Ultimate Bunny?",
    description: "For the discerning",
    date: new Date(),
    tags: ["memes", "personal"],
  },
];
