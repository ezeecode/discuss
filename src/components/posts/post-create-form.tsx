"use client";

import { useActionState, startTransition } from "react";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@heroui/react";
import FormButton from "@/components/common/form-button";
import { createPost } from "@/actions";

interface PostCreateFormProps {
  slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  const [formState, action, isPending] = useActionState(createPost.bind(null, slug), {
    errors: {},
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary" variant="flat">
          Create New Post
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-4 w-80">
          <h3 className="text-lg font-bold mb-6">Create New Post</h3>

          <form
            action={action}
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col space-y-4"
          >
            <Input
              name="title"
              type="text"
              id="title"
              placeholder="Title"
              label="Title"
              labelPlacement="outside"
              className="w-full"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(", ")}
            />

            <Textarea
              name="content"
              type="text"
              id="content"
              rows={4}
              placeholder="Topic Content"
              label="Content"
              labelPlacement="outside"
              className="w-full"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
            />

            {formState.errors._form && (
              <div className="text-red-500">
                {formState.errors._form.join(", ")}
              </div>
            )}

            <FormButton isLoading={isPending}>Submit</FormButton>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
