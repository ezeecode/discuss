import { db } from "@/db";
import Link from "next/link";

interface PostListProps {
  slug: string;
}

export default async function PostList({slug}: PostListProps) {
    // Fetch posts from the database based on the slug
    const posts = await db.post.findMany({
        where: {
            topic: {
                slug: slug,
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const postList = posts.map((post) => (
        <div key={post.id} className="p-4 border-b">
            <Link href={`/topics/${slug}/posts/${post.id}`}>
            <h4 className="text-md font-semibold">{post.title}</h4>
            <p>{post.content}</p>
            </Link>
        </div>
    ));

    return postList;
}
