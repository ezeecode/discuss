import Link from "next/link";
import { Chip } from "@heroui/chip";
import { db } from "@/db";
import paths from "@/paths";

export default async function TopicList() {
  const topics = await db.topic.findMany();

  const renderedTopics = topics.map((topic) => (
    <Link
      key={topic.id}
      href={paths.topicShow(topic.slug)}
      className="flex items-center gap-2"
    >
      <Chip color="success" variant="shadow" className="cursor-pointer">
        {topic.slug}
      </Chip>
    </Link>
  ));

  return (
    <div className="flex flex-col gap-4 p-4 border rounded shadow border-gray-500">
      <h3 className="text-md font-bold">Topics</h3>
      <div className="flex flex-row flex-wrap gap-2">
        {renderedTopics}
      </div>
    </div>
  );
}
