
import React from "react";

interface FormActionsProps {
  onCancel: () => void;
  isEditing: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ onCancel, isEditing }) => {
  return (
    <div className="flex justify-end space-x-3">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Annuler
      </button>
      <button
        type="submit"
        className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
      >
        {isEditing ? "Mettre à jour" : "Ajouter"}
      </button>
    </div>
  );
};

export default FormActions;
