import { TopNavBar } from "@/components/TopNavBar";
import { posts } from "@/components/Posts";
import TextLink from "@/components/text/text-link";
// This function will be called to generate the path dynamically
interface PostPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  // Fetch your data here to generate static paths
  // For example, fetch all posts IDs from an API or database
  // const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  // const posts = await res.json();

  // combine posts and projects
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));
  return paths;
}

export default function PostPage({ params }: PostPageProps) {
  const { id } = params;

  // Fetch post data based on the `id` parameter
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return <div>Post not found</div>;
  }

  const formattedDate = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
  }).format(post.date);

  return (
    <div>
      <div className="flex justify-center mt-10">
        <TopNavBar />
      </div>

      <div className="flex flex-col mt-20 mx-auto max-w-4xl text-left">
        <h1 className="text-primary text-4xl">{post.title}</h1>
        <h2 className="text-accent mt-2">{formattedDate}</h2>
        <p className="max-w-[88ch] py-10">{post.body}</p>
      </div>
    </div>
  );
}
