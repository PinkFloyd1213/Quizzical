
import React from "react";
import { Question } from "../../../types/question";

interface BasicQuestionFieldsProps {
  question: Question;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const BasicQuestionFields: React.FC<BasicQuestionFieldsProps> = ({
  question,
  handleChange,
}) => {
  return (
    <>
      <div>
        <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
          Texte de la question
        </label>
        <input
          type="text"
          id="text"
          name="text"
          value={question.text}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="Entrez la question..."
          required
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
          Type de question
        </label>
        <select
          id="type"
          name="type"
          value={question.type}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="text">Texte libre</option>
          <option value="boolean">Oui/Non</option>
          <option value="multiple-choice">Choix multiple</option>
          <option value="image-choice">Choix d'image(s)</option>
          <option value="color-choice">Choix de couleur(s)</option>
          <option value="ranking">Classement</option>
        </select>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="required"
          name="required"
          checked={question.required}
          onChange={handleChange}
          className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
        />
        <label htmlFor="required" className="ml-2 block text-sm text-gray-700">
          Question obligatoire
        </label>
      </div>
    </>
  );
};

export default BasicQuestionFields;
