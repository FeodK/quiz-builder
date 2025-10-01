import React from "react";
import { ButtonProperties } from "@/types/quiz";
import { Button } from "@/components/ui/Button/Button";

export const ButtonBlock: React.FC<ButtonProperties> = ({ text, action }) => {
  return (
    <div className="text-center mb-6">
      <Button
        size="lg"
        className={action === "submit" ? "bg-green-600 hover:bg-green-700" : ""}
      >
        {text}
      </Button>
    </div>
  );
};