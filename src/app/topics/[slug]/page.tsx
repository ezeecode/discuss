import PostCreateForm from "@/components/posts/post-create-form";
import PostList from "@/components/posts/post-list";

interface TopicShowPageProps {
  params: Promise<{ slug: string }>;
}

export default async function TopicShowPage({ params }: TopicShowPageProps) {
  // This page is for showing a specific topic based on the slug

  const { slug } = await params;

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2 border rounded-full p-4 bg-green-200 text-center">
          {slug}
        </h1>
        <div className="bg-white shadow-md rounded-lg p-4 mt-8">
          <PostList slug={slug} />
        </div>
      </div>
      <div className="col-span-1 px-8">
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
}
