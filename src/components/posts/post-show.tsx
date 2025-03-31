import { db } from "@/db";
import { notFound } from "next/navigation";

interface PostShowProps {
  postId: string;
}

export default async function PostShow({ postId }: PostShowProps) {

  // Fetch the post from the database
  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      user: { select: { name: true } },
      _count: {
        select: { comments: true },
      },
    },
  });

  if (!post) {
    notFound();
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
