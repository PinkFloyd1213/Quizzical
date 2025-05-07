
import React, { useState } from "react";
import { ColorChoice } from "../../../types/question";

interface ColorChoiceFieldsProps {
  colorChoices: ColorChoice[];
  onAddColorChoice: (color: string, name: string) => void;
  onRemoveColorChoice: (id: string) => void;
}

const ColorChoiceFields: React.FC<ColorChoiceFieldsProps> = ({
  colorChoices = [],
  onAddColorChoice,
  onRemoveColorChoice,
}) => {
  const [colorValue, setColorValue] = useState<string>("#4B5563");
  const [colorName, setColorName] = useState<string>("");

  const handleAddColor = () => {
    if (!colorValue.trim() || !colorName.trim()) return;
    onAddColorChoice(colorValue.trim(), colorName.trim());
    setColorName("");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Couleurs</h3>
      <div className="flex space-x-2 items-center">
        <input
          type="color"
          value={colorValue}
          onChange={(e) => setColorValue(e.target.value)}
          className="h-10 w-10 border-0 p-0 rounded-md"
        />
        <input
          type="text"
          value={colorName}
          onChange={(e) => setColorName(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="Nom de la couleur (ex: Rouge)"
        />
        <button
          type="button"
          onClick={handleAddColor}
          className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
        >
          Ajouter
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        {colorChoices.map((colorChoice) => (
          <div
            key={colorChoice.id}
            className="relative flex flex-col items-center"
          >
            <div
              className="w-12 h-12 rounded-full mb-1"
              style={{ backgroundColor: colorChoice.color }}
            ></div>
            <span className="text-xs">{colorChoice.name}</span>
            <button
              type="button"
              onClick={() => onRemoveColorChoice(colorChoice.id)}
              className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs hover:bg-red-700"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorChoiceFields;
