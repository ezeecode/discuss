"use server";

import type { Topic } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import paths from "@/paths";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";

const TopicSchema = z.object({
  title: z
    .string()
    .min(5)
    .max(100)
    .regex(/^[a-zA-Z- ]+$/, {
      message: "Title must only contain letters, spaces, and dashes",
    }),
  description: z
    .string()
    .min(10)
    .max(500)
    .regex(/^[a-zA-Z0-9- .]+$/, {
      message:
        "Description must only contain letters, numbers, spaces, and dashes",
    }),
});

interface CreateTopicFormState {
  errors: {
    title?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createTopic(
  formState: CreateTopicFormState,
  formdata: FormData
): Promise<CreateTopicFormState> {
  const result = TopicSchema.safeParse({
    title: formdata.get("title") as string, // validate the title
    description: formdata.get("description") as string, // validate the description
  });

  const session = await auth();

  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in to create a topic"],
      },
    };
  }

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.title,
        description: result.data.description,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message.toLowerCase().includes("unique constraint")) {
      return {
        errors: {
          _form: ["A topic with that title already exists"],
        },
      };
    } else if (error instanceof Error) {
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

  revalidatePath(paths.home());
  redirect(paths.topicShow(topic.slug));
}
