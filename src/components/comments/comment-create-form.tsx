"use client";

import { Button, Textarea } from "@heroui/react";
import {
  useState,
  useActionState,
  startTransition,
  useEffect,
  useRef,
} from "react";
import { createComment } from "@/actions";
import FormButton from "../common/form-button";

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
}

export default function CommentCreateForm({ postId, parentId }: CommentCreateFormProps) {
  // have a state variable to track if the form is open or closed
  const [open, setOpen] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  // function to toggle the open state
  const handleToggle = () => {
    setOpen(!open);
  };

  // useActionState to handle form submission
  const [formState, action, isPending] = useActionState(
    createComment.bind(null, {postId, parentId}),
    {
      errors: {},
    }
  );

  // clear the form when submitted
  useEffect(() => {
    if (formState.success) {
      formRef.current?.reset();
      setOpen(false);
    }
  }, [formState]);

  // handle form submission
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <div>
      <Button
        variant="light"
        className="underline"
        onPress={handleToggle}
        size="sm"
      >
        {open ? "Collapse" : "Reply"}
      </Button>

      <div className={open ? "block" : "hidden"}>
        <form
          className="flex flex-col"
          action={action}
          onSubmit={handleSubmit}
          ref={formRef}
          noValidate
        >
          <Textarea
            name="content"
            id="content"
            className="rounded p-4 w-auto"
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

          <div className="w-20 mx-4">
            <FormButton isLoading={isPending}>Submit</FormButton>
          </div>
        </form>
      </div>
    </div>
  );
}
