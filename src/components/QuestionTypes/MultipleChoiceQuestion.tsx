
import React, { useState } from "react";
import { Check } from "lucide-react";
import { Question } from "../../types/question";

interface MultipleChoiceQuestionProps {
  question: Question;
  onAnswer: (answer: string | string[] | null) => void;
  currentAnswer?: string | string[] | null;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
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

  const [selectedOptions, setSelectedOptions] = useState<string[]>(initialValue);

  const handleOptionClick = (optionValue: string) => {
    if (isMultiple) {
      const updatedOptions = selectedOptions.includes(optionValue)
        ? selectedOptions.filter((option) => option !== optionValue)
        : [...selectedOptions, optionValue];
      
      setSelectedOptions(updatedOptions);
      onAnswer(updatedOptions.length ? updatedOptions : null);
    } else {
      setSelectedOptions([optionValue]);
      onAnswer(optionValue);
    }
  };

  return (
    <div className="space-y-4 w-full">
      <label className="block text-lg font-medium">
        {question.text} {question.required && <span className="text-red-500">*</span>}
      </label>
      <div className="space-y-2">
        {question.choices?.map((choice) => (
          <div
            key={choice.id}
            onClick={() => handleOptionClick(choice.value)}
            className={`p-3 flex items-center space-x-3 rounded-lg cursor-pointer transition-all ${
              selectedOptions.includes(choice.value)
                ? "bg-violet-100 border-2 border-violet-500"
                : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
            }`}
          >
            <div
              className={`w-6 h-6 flex items-center justify-center rounded-md border ${
                selectedOptions.includes(choice.value)
                  ? "bg-violet-600 border-violet-600"
                  : "border-gray-300"
              }`}
            >
              {selectedOptions.includes(choice.value) && (
                <Check className="h-4 w-4 text-white" />
              )}
            </div>
            <span>{choice.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
