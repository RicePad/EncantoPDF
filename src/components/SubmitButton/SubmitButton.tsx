"use client";

// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface Props {
  title: string;
  isButtonEnabled: boolean;
}

const SubmitButton = ({ title, isButtonEnabled }: Props) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="orange"
      disabled={!isButtonEnabled || pending}
    >
    {
      pending ? (
        <Loader2
          className = "h-5 w-5 text-white/80 animate-spin"
          style = {{ strokeWidth: "3" }}
    />
      ) : (
    `${title}`
  )
}
</Button>
  );
};

export default SubmitButton;
