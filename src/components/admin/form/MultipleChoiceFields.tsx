
import React, { useState } from "react";
import { Choice } from "../../../types/question";

interface MultipleChoiceFieldsProps {
  choices: Choice[];
  onAddChoice: (value: string) => void;
  onRemoveChoice: (id: string) => void;
}

const MultipleChoiceFields: React.FC<MultipleChoiceFieldsProps> = ({
  choices = [],
  onAddChoice,
  onRemoveChoice,
}) => {
  const [choice, setChoice] = useState<string>("");

  const handleAddChoice = () => {
    if (!choice.trim()) return;
    onAddChoice(choice.trim());
    setChoice("");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Options</h3>
      <div className="flex space-x-2">
        <input
          type="text"
          value={choice}
          onChange={(e) => setChoice(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="Ajouter une option..."
        />
        <button
          type="button"
          onClick={handleAddChoice}
          className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
        >
          Ajouter
        </button>
      </div>

      <ul className="space-y-2">
        {choices.map((c) => (
          <li
            key={c.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
          >
            <span>{c.value}</span>
            <button
              type="button"
              onClick={() => onRemoveChoice(c.id)}
              className="text-red-500 hover:text-red-700"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultipleChoiceFields;
