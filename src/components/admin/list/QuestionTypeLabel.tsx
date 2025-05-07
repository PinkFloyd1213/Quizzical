
import React from "react";

interface QuestionTypeLabelProps {
  type: string;
}

const QuestionTypeLabel: React.FC<QuestionTypeLabelProps> = ({ type }) => {
  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case "text": return "Texte";
      case "boolean": return "Oui/Non";
      case "multiple-choice": return "Choix multiple";
      case "image-choice": return "Choix d'image(s)";
      case "color-choice": return "Choix de couleur(s)";
      case "ranking": return "Classement";
      default: return type;
    }
  };

  return (
    <span className="bg-violet-100 text-violet-800 px-2 py-1 rounded">
      {getQuestionTypeLabel(type)}
    </span>
  );
};

export default QuestionTypeLabel;
