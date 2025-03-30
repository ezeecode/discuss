import PostShow from "@/components/posts/post-show";

interface PostShowPageProps {
  params: Promise<{ slug: string; postId: string }>;
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = await params;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2 border rounded-full p-4 bg-green-200 text-center">
        {slug}
      </h1>
      <div className="bg-white shadow-md rounded-lg p-4 mt-8">
      <PostShow params={params} />
      </div>
    </div>
  );
}