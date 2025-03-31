"use client";

import { Button, Textarea } from "@heroui/react";
import { useState, useActionState, startTransition } from "react";
import { createComment } from "@/actions";
import FormButton from "../common/form-button";

interface CommentCreateFormProps {
  slug: string;
  postId: string;
}

export default function CommentCreateForm({ slug, postId }: CommentCreateFormProps) {
  // have a state variable to track if the form is open or closed
  const [open, setOpen] = useState(false);

  // function to toggle the open state
  const handleToggle = () => {
    setOpen(!open);
  };

  const [formState, action, isPending] = useActionState(
    createComment.bind(null, slug, postId),
    {
      errors: {},
    }
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <div>
      <Button variant="light" className="underline" onPress={handleToggle}>
        {open ? "Collapse" : "Reply"}
      </Button>

      <div className={open ? "block" : "hidden"}>
        <form
          className="flex flex-col"
          action={action}
          onSubmit={handleSubmit}
          noValidate
        >
          <Textarea
            name="content"
            id="content"
            className="rounded p-4"
            placeholder="Write your comment here..."
            rows={4}
            isInvalid={!!formState.errors.content}
            errorMessage={formState.errors.content?.join(", ")}
          ></Textarea>

          {formState.errors._form && (
            <div className="text-red-500">
              {formState.errors._form?.join(", ")}
            </div>
          )}

          <FormButton isLoading={isPending}>Submit</FormButton>
        </form>
      </div>
    </div>
  );
}
