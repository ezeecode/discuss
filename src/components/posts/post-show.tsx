import { db } from "@/db";

interface PostShowProps {
  params: Promise<{ slug: string; postId: string }>;
}

export default async function PostShow({ params }: PostShowProps) {
  const { slug, postId } = await params;

  // Fetch the post from the database
  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: {
        select: { comments: true },
      },
    },
  });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="p-4">
      <p className="text-right text-xs text-gray-500">By {post.user.name}</p>
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p>{post.content}</p>
      <p className="text-gray-500 mt-2">{post._count.comments} comments</p>
    </div>
  );
}
