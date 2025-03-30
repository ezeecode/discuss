import { db } from "@/db";


interface PostShowProps {
  params: Promise<{ slug: string; postId: string }>;
}

export default async function PostShow({params}: PostShowProps) {
  const { slug, postId } = await params;

  // Fetch the post from the database
  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}