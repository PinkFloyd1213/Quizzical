
import React, { useState } from "react";
import { Question } from "../../types/question";

interface TextQuestionProps {
  question: Question;
  onAnswer: (answer: string | null) => void;
  currentAnswer?: string | null;
}

const TextQuestion: React.FC<TextQuestionProps> = ({ question, onAnswer, currentAnswer }) => {
  const [answer, setAnswer] = useState<string>(currentAnswer || "");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setAnswer(value);
    onAnswer(value || null);
  };

  return (
    <div className="space-y-4 w-full">
      <label className="block text-lg font-medium">
        {question.text} {question.required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400 focus:border-transparent min-h-[120px]"
        value={answer}
        onChange={handleChange}
        placeholder="Votre réponse..."
        required={question.required}
      />
    </div>
  );
};

export default TextQuestion;
