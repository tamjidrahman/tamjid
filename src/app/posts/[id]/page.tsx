import { TopNavBar } from "@/components/TopNavBar";
import { posts } from "@/components/Posts";
import TextLink from "@/components/text/text-link";
import { Badge } from "@/components/ui/badge";
// This function will be called to generate the path dynamically
interface PostPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
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
        <div className="py-10">
          <TextLink href="/posts">Posts</TextLink> /{" "}
          <a className="text-primary hover:underline" href={post.id}>
            {post.title}
          </a>
        </div>
        <h1 className="text-primary text-4xl">{post.title}</h1>
        <div className="space-x-1">
          {post.tags.map((tag) => (
            <a href={`/posts/?tag=${tag}`} key={tag}>
              <Badge key={tag}>{tag}</Badge>
            </a>
          ))}
        </div>
        <h2 className="text-secondary mt-2">{post.description}</h2>
        <p className="text-accent mt-2">{formattedDate}</p>
        <p className="max-w-[88ch] py-10">{post.body}</p>
      </div>
    </div>
  );
}
