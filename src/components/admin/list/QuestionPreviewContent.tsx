
import React from "react";
import { Question } from "../../../types/question";

interface QuestionPreviewContentProps {
  question: Question;
}

const QuestionPreviewContent: React.FC<QuestionPreviewContentProps> = ({ question }) => {
  if (question.type === "multiple-choice" && question.choices) {
    return (
      <div className="mt-3 text-sm text-gray-500">
        <p>Options: {question.choices.map(c => c.value).join(", ")}</p>
      </div>
    );
  }

  if (question.type === "image-choice" && question.imageChoices) {
    return (
      <div className="mt-3 text-sm text-gray-500">
        <p>Images: {question.imageChoices.length} image(s)</p>
      </div>
    );
  }

  if (question.type === "color-choice" && question.colorChoices) {
    return (
      <div className="mt-3 text-sm text-gray-500 flex items-center">
        <p className="mr-2">Couleurs:</p>
        <div className="flex space-x-1">
          {question.colorChoices.map(c => (
            <div
              key={c.id}
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: c.color }}
              title={c.name}
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (question.type === "ranking" && question.rankingItems) {
    return (
      <div className="mt-3 text-sm text-gray-500">
        <p>Éléments à classer: {question.rankingItems.map(i => i.value).join(", ")}</p>
      </div>
    );
  }

  return null;
};

export default QuestionPreviewContent;
