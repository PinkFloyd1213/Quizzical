
import React, { useState } from "react";
import { RankingItem } from "../../../types/question";

interface RankingFieldsProps {
  rankingItems: RankingItem[];
  onAddRankingItem: (value: string) => void;
  onRemoveRankingItem: (id: string) => void;
}

const RankingFields: React.FC<RankingFieldsProps> = ({
  rankingItems = [],
  onAddRankingItem,
  onRemoveRankingItem,
}) => {
  const [rankingItem, setRankingItem] = useState<string>("");

  const handleAddItem = () => {
    if (!rankingItem.trim()) return;
    onAddRankingItem(rankingItem.trim());
    setRankingItem("");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Éléments à classer</h3>
      <div className="flex space-x-2">
        <input
          type="text"
          value={rankingItem}
          onChange={(e) => setRankingItem(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="Ajouter un élément..."
        />
        <button
          type="button"
          onClick={handleAddItem}
          className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
        >
          Ajouter
        </button>
      </div>

      <ul className="space-y-2">
        {rankingItems.map((item, index) => (
          <li
            key={item.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center">
              <span className="w-6 h-6 flex items-center justify-center bg-violet-100 text-violet-800 rounded-full mr-2">
                {index + 1}
              </span>
              <span>{item.value}</span>
            </div>
            <button
              type="button"
              onClick={() => onRemoveRankingItem(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankingFields;
