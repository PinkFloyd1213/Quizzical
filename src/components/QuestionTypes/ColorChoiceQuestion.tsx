
import React, { useState } from "react";
import { Check } from "lucide-react";
import { Question } from "../../types/question";

interface ColorChoiceQuestionProps {
  question: Question;
  onAnswer: (answer: string | string[] | null) => void;
  currentAnswer?: string | string[] | null;
}

const ColorChoiceQuestion: React.FC<ColorChoiceQuestionProps> = ({
  question,
  onAnswer,
  currentAnswer,
}) => {
  const isMultiple = question.multipleSelection || false;
  const initialValue = currentAnswer
    ? Array.isArray(currentAnswer)
      ? currentAnswer
      : [currentAnswer]
    : [];

  const [selectedColors, setSelectedColors] = useState<string[]>(initialValue);

  const handleColorClick = (colorId: string, colorName: string) => {
    if (isMultiple) {
      const updatedColors = selectedColors.includes(colorId)
        ? selectedColors.filter((id) => id !== colorId)
        : [...selectedColors, colorId];
      
      setSelectedColors(updatedColors);
      onAnswer(updatedColors.length ? 
        updatedColors.map(id => {
          const colorChoice = question.colorChoices?.find(c => c.id === id);
          return colorChoice ? colorChoice.name : id;
        }) : 
        null);
    } else {
      setSelectedColors([colorId]);
      onAnswer(colorName);
    }
  };

  return (
    <div className="space-y-4 w-full">
      <label className="block text-lg font-medium">
        {question.text} {question.required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex flex-wrap gap-4">
        {question.colorChoices?.map((colorChoice) => (
          <div
            key={colorChoice.id}
            className={`relative cursor-pointer transition-all`}
            onClick={() => handleColorClick(colorChoice.id, colorChoice.name)}
          >
            <div
              className={`w-12 h-12 rounded-full`}
              style={{ backgroundColor: colorChoice.color }}
            >
              {selectedColors.includes(colorChoice.id) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check 
                    className="h-6 w-6" 
                    style={{ 
                      color: isLightColor(colorChoice.color) ? "#000" : "#fff" 
                    }} 
                  />
                </div>
              )}
            </div>
            <p className="text-xs mt-1 text-center">{colorChoice.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to determine if a color is light or dark
const isLightColor = (color: string): boolean => {
  // For hex colors
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
  }
  
  // Default to dark for non-hex colors
  return false;
};

export default ColorChoiceQuestion;
