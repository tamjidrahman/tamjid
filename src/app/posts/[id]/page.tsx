import { posts } from "@/components/Posts";
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

  return (
    <div>
      <h1>Post ID: {post.id}</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}
