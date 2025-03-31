import type { PostWithData } from "@/db/queries/posts";
import Link from "next/link";
import paths from "@/paths";

interface PostListProps {
  fetchData: () => Promise<PostWithData[]>;
}

export default async function PostList({ fetchData }: PostListProps) {
  // This component is for displaying a list of posts
  const posts = await fetchData();

  const renderedPosts = posts.map((post) => {
    const topicSlug = post.topic.slug;

    if (!topicSlug) {
      throw new Error("Topic slug is undefined");
    }

    return (
      <div key={post.id} className="p-4 border-b">
        <Link href={paths.postShow(topicSlug, post.id)}>
          <h4 className="text-md font-semibold">{post.title}</h4>
        </Link>
        <div className="flex flex-row gap-8">
          <p className="text-xs text-gray-500">By {post.user.name}</p>
          <p className="text-xs text-gray-500">
            {post._count.comments} comments
          </p>
        </div>
      </div>
    );
  });

  return renderedPosts;
}
