
import React from "react";
import { Question } from "../../../types/question";
import QuestionTypeLabel from "./QuestionTypeLabel";
import QuestionPreviewContent from "./QuestionPreviewContent";

interface QuestionItemProps {
  question: Question;
  index: number;
  totalQuestions: number;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  index,
  totalQuestions,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}) => {
  return (
    <li className="border rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium">{question.text}</h3>
            <div className="flex items-center mt-1 space-x-2 text-sm text-gray-500">
              <QuestionTypeLabel type={question.type} />
              {question.required && (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
                  Obligatoire
                </span>
              )}
              {(question.type === "multiple-choice" || 
                question.type === "image-choice" || 
                question.type === "color-choice") && 
                question.multipleSelection && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Multi-sélection
                </span>
              )}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => onMoveUp(index)}
              disabled={index === 0}
              className={`p-1 rounded ${
                index === 0
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:bg-gray-200"
              }`}
            >
              ↑
            </button>
            <button
              onClick={() => onMoveDown(index)}
              disabled={index === totalQuestions - 1}
              className={`p-1 rounded ${
                index === totalQuestions - 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:bg-gray-200"
              }`}
            >
              ↓
            </button>
            <button
              onClick={() => onEdit(question.id)}
              className="p-1 text-blue-600 hover:text-blue-800"
            >
              Modifier
            </button>
            <button
              onClick={() => onDelete(question.id)}
              className="p-1 text-red-600 hover:text-red-800"
            >
              Supprimer
            </button>
          </div>
        </div>

        <QuestionPreviewContent question={question} />
      </div>
    </li>
  );
};

export default QuestionItem;
