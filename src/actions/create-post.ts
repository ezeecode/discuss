"use server";

import { Post } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import paths from "@/paths";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";

const PostSchema = z.object({
  title: z
    .string()
    .min(5)
    .max(100)
    .regex(/^[a-zA-Z- ]+$/, {
      message: "Title must only contain letters, spaces, and dashes",
    }),
  content: z
    .string()
    .min(10)
    .max(500)
    .regex(/^[a-zA-Z0-9- _@./#&+-?]+$/, {
      message: "Content must only contain letters, numbers, spaces, and special characters",
    }),
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  formdata: FormData
): Promise<CreatePostFormState> {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ["You must be signed in to create a post"],
      },
    };
  }

  const result = PostSchema.safeParse({
    title: formdata.get("title") as string, // validate the title
    content: formdata.get("content") as string, // validate the content
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const topicId = await db.topic.findFirst({
    where: { slug },
    select: { id: true },
  });

  if (!topicId) {
    return {
      errors: {
        _form: ["Topic not found"],
      },
    };
  }

  const { title, content } = result.data;

  let post: Post;
  try {
    post = await db.post.create({
      data: {
        title,
        content,
        userId: session.user.id,
        topicId: topicId.id,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["An unknown error occurred"],
        },
      };
    }
  }

  revalidatePath(paths.topicShow(slug)); // Revalidate the topic page to show the new post
  redirect(paths.postShow(slug, post.id)); // Redirect to the new post page
}
