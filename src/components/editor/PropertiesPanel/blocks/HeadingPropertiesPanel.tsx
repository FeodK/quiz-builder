"use client";

import { HeadingProperties } from "@/types/quiz";
import { Input } from "@/components/ui/Input/Input";

interface Props {
  properties: HeadingProperties;
  onChange: (updates: Partial<HeadingProperties>) => void;
}

export const HeadingPropertiesPanel: React.FC<Props> = ({
  properties,
  onChange,
}) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Heading Text
      </label>
      <Input
        type="text"
        value={properties.text ?? ""}
        onChange={(e) => onChange({ text: e.target.value })}
        placeholder="Enter heading text..."
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Heading Level
      </label>
      <select
        value={properties.level ?? 2}
        onChange={(e) =>
          onChange({ level: parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6 })
        }
        className="w-full p-2 border border-gray-300 rounded-md text-sm"
      >
        {[1, 2, 3, 4, 5, 6].map((l) => (
          <option key={l} value={l}>{`H${l} ${
            l === 1 ? "Largest" : l === 6 ? "Smallest" : ""
          }`}</option>
        ))}
      </select>
    </div>
  </div>
);
