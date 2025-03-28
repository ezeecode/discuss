"use client";

import { Button } from "@heroui/react";

interface FormButtonProps {
  children: React.ReactNode;
  isLoading: boolean;
}

export default function FormButton({ children, isLoading }: FormButtonProps) {
  return (
    <Button type="submit" color="primary" variant="flat" isLoading={isLoading}>
      {children}
    </Button>
  );
}
