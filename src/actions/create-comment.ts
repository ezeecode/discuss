"use server";

import { Comment } from "@prisma/client";
import { revalidatePath } from "next/cache";
import paths from "@/paths";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";

const CommentSchema = z.object({
  content: z
    .string()
    .min(10)
    .max(500)
    .regex(/^[a-zA-Z0-9- _@./#&+-?]+$/, {
      message:
        "Content must only contain letters, numbers, spaces, and special characters",
    }),
});

interface CreateCommentFormState {
  errors: {
    content?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export async function createComment(
  postId: string,
  formState: CreateCommentFormState,
  formdata: FormData
): Promise<CreateCommentFormState> {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ["You must be signed in to create a comment"],
      },
    };
  }

  // validate the content
  const result = CommentSchema.safeParse({
    content: formdata.get("content") as string,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // add comment to db
  let comment: Comment;
  try {
    comment = await db.comment.create({
      data: {
        content: result.data.content,
        postId: postId,
        userId: session.user.id,
        parentId: null,
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
          _form: ["An Unknown error occurred"],
        },
      };
    }
  }

  revalidatePath(paths.postShow("slug", "postId"));

  return {
    errors: {},
    success: true,
  };
}
