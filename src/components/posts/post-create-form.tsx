"use client";

import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@heroui/react";

export default function PostCreateForm() {
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

          <form className="flex flex-col space-y-4">
            <Input
              type="text"
              id="title"
              placeholder="Topic Name"
              label="Topic Name"
              labelPlacement="outside"
              className="w-full"
            />

            <Textarea
              type="text"
              id="content"
              rows={4}
              placeholder="Topic Content"
              label="Content"
              labelPlacement="outside"
              className="w-full"
            />

            <Button>Submit</Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
