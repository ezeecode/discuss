import CommentCreateForm from "@/components/comments/comment-create-form";
import CommentList from "@/components/comments/comment-list";
import PostShow from "@/components/posts/post-show";
import paths from "@/paths";
import Link from "next/link";
import { fetchCommentsByPostId } from "@/db/queries/comments";

interface PostShowPageProps {
  params: Promise<{ slug: string; postId: string }>;
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = await params;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2 border rounded-full p-4 bg-green-200 text-center">
        <Link href={paths.topicShow(slug)}>{slug}</Link>
      </h1>
      <div className="bg-white shadow-md rounded-lg p-4 mt-8">
        <PostShow postId={postId} />
        <CommentCreateForm postId={postId} />
        <CommentList fetchData={() => fetchCommentsByPostId(postId)} />
      </div>
    </div>
  );
}