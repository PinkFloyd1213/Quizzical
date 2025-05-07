
import React from "react";

const EmptyQuestionsList: React.FC = () => {
  return (
    <div className="text-center p-8 border border-dashed border-gray-300 rounded-lg">
      <p className="text-gray-500">Aucune question. Cliquez sur "Ajouter une question" pour commencer.</p>
    </div>
  );
};

export default EmptyQuestionsList;
