import { posts, PostPage } from "@/components/postPage";
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

export default function Page({ params }: PostPageProps) {
  const { id } = params;

  // Fetch post data based on the `id` parameter
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <PostPage post={post}>
      <div> Coming Soon...</div>
    </PostPage>
  );
}
