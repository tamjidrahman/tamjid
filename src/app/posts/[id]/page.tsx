import Bunny from "@/components/bunny";
import { posts, PostPage } from "@/components/postPage";
import fs from "fs";
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

  const post = posts.find((post) => post.id === id);
  const htmlExists = fs.existsSync(`public/${id}.html`);
  if (!post) {
    return (
      <div>
        post not found <Bunny />
      </div>
    );
  }
  const html = htmlExists && fs.readFileSync(`public/${id}.html`, "utf8");
  return (
    <PostPage post={post}>
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      ) : (
        <div>
          {" "}
          Coming soon... <Bunny />
        </div>
      )}
    </PostPage>
  );
}
