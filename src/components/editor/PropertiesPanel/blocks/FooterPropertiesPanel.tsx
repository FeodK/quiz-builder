"use client";

import { FooterProperties } from "@/types/quiz";

interface Props {
  properties: FooterProperties;
  onChange: (updates: Partial<FooterProperties>) => void;
}

export const FooterPropertiesPanel: React.FC<Props> = ({
  properties,
  onChange,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Footer Text
    </label>
    <textarea
      value={properties.text ?? ""}
      onChange={(e) => onChange({ text: e.target.value })}
      className="w-full p-2 border border-gray-300 rounded-md text-sm resize-none"
      rows={3}
      placeholder="Enter footer text..."
    />
  </div>
);
