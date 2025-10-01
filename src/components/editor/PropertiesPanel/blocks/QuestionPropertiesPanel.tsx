"use client";

import { QuestionProperties } from "@/types/quiz";
import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";

interface Props {
  properties: QuestionProperties;
  onChange: (updates: Partial<QuestionProperties>) => void;
}

export const QuestionPropertiesPanel: React.FC<Props> = ({
  properties,
  onChange,
}) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Question
      </label>
      <Input
        type="text"
        value={properties.question ?? ""}
        onChange={(e) => onChange({ question: e.target.value })}
        placeholder="Enter your question..."
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Question Type
      </label>
      <select
        value={properties.type ?? "single"}
        onChange={(e) =>
          onChange({ type: e.target.value as QuestionProperties["type"] })
        }
        className="w-full p-2 border border-gray-300 rounded-md text-sm"
      >
        <option value="single">Single Choice</option>
        <option value="multi">Multiple Choice</option>
        <option value="text">Text Answer</option>
      </select>
    </div>

    {(properties.type === "single" || properties.type === "multi") && (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Options
        </label>
        <div className="space-y-2">
          {(properties.options ?? []).map((option, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                type="text"
                value={option}
                onChange={(e) => {
                  const newOptions = [...(properties.options ?? [])];
                  newOptions[i] = e.target.value;
                  onChange({ options: newOptions });
                }}
                placeholder={`Option ${i + 1}`}
                className="flex-1"
              />
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  const newOptions = (properties.options ?? []).filter(
                    (_, idx) => idx !== i
                  );
                  onChange({ options: newOptions });
                }}
              >
                ×
              </Button>
            </div>
          ))}
          <Button
            variant="secondary"
            size="sm"
            className="w-full"
            onClick={() =>
              onChange({
                options: [...(properties.options ?? []), "New Option"],
              })
            }
          >
            + Add Option
          </Button>
        </div>
      </div>
    )}

    <div className="flex items-center">
      <input
        type="checkbox"
        id="required"
        checked={properties.required ?? false}
        onChange={(e) => onChange({ required: e.target.checked })}
        className="mr-2"
      />
      <label htmlFor="required" className="text-sm text-gray-700">
        Required question
      </label>
    </div>
  </div>
);
