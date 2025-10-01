"use client";

import { ButtonProperties } from "@/types/quiz";
import { Input } from "@/components/ui/Input/Input";

interface Props {
  properties: ButtonProperties;
  onChange: (updates: Partial<ButtonProperties>) => void;
}

export const ButtonPropertiesPanel: React.FC<Props> = ({
  properties,
  onChange,
}) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Button Text
      </label>
      <Input
        type="text"
        value={properties.text ?? ""}
        onChange={(e) => onChange({ text: e.target.value })}
        placeholder="Enter button text..."
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Button Action
      </label>
      <select
        value={properties.action ?? "next"}
        onChange={(e) =>
          onChange({ action: e.target.value as ButtonProperties["action"] })
        }
        className="w-full p-2 border border-gray-300 rounded-md text-sm"
      >
        <option value="next">Next Question</option>
        <option value="submit">Submit Quiz</option>
      </select>
    </div>
  </div>
);
