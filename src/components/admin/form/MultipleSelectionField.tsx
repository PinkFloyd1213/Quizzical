
import React from "react";

interface MultipleSelectionFieldProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MultipleSelectionField: React.FC<MultipleSelectionFieldProps> = ({
  checked,
  onChange
}) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id="multipleSelection"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
      />
      <label htmlFor="multipleSelection" className="ml-2 block text-sm text-gray-700">
        Autoriser plusieurs sélections
      </label>
    </div>
  );
};

export default MultipleSelectionField;
