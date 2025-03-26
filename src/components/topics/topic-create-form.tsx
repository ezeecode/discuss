"use client";

import React, { useActionState, startTransition } from "react";

import { Button } from "@heroui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { Input, Textarea } from "@heroui/input";

import { createTopic } from "@/actions";

export default function TopicCreateForm() {
  const [formState, action] = useActionState(createTopic, {
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
    <div>
      <Popover placement="left" color="default">
        <PopoverTrigger>
          <Button color="primary" variant="flat">
            New Topic
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <form action={action} onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col p-4 space-y-4 w-80">
              <h3 className="text-lg font-bold mb-6">Create New Topic</h3>
              <Input
                type="text"
                name="title"
                placeholder="Topic title"
                className="input"
                label="Title"
                labelPlacement="outside"
                isInvalid={!!formState.errors.title}
                errorMessage={formState.errors.title?.join(", ")}
              />

              <Textarea
                name="description"
                placeholder="Describe your topic"
                className="input"
                label="Description"
                labelPlacement="outside"
                isInvalid={!!formState.errors.description}
                errorMessage={formState.errors.description?.join(", ")}
              />

              {formState.errors._form ? (
                <div className="text-red-500">
                  {formState.errors._form.join(", ")}
                </div>
              ) : null}

              <Button type="submit" color="primary" variant="flat">
                Create
              </Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
