
import React, { useState } from "react";
import { Question } from "../../types/question";

interface BooleanQuestionProps {
  question: Question;
  onAnswer: (answer: string | null) => void;
  currentAnswer?: string | null;
}

const BooleanQuestion: React.FC<BooleanQuestionProps> = ({ question, onAnswer, currentAnswer }) => {
  const [answer, setAnswer] = useState<string | null>(currentAnswer || null);

  const handleChange = (value: string) => {
    setAnswer(value);
    onAnswer(value);
  };

  return (
    <div className="space-y-4 w-full">
      <label className="block text-lg font-medium">
        {question.text} {question.required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => handleChange("Oui")}
          className={`px-6 py-3 rounded-lg transition-all ${
            answer === "Oui"
              ? "bg-violet-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Oui
        </button>
        <button
          type="button"
          onClick={() => handleChange("Non")}
          className={`px-6 py-3 rounded-lg transition-all ${
            answer === "Non"
              ? "bg-violet-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Non
        </button>
      </div>
    </div>
  );
};

export default BooleanQuestion;
