import React, { useState, useEffect } from "react";
import { Question } from "../../types/question";

interface RankingQuestionProps {
  question: Question;
  onAnswer: (answer: string[] | null) => void;
  currentAnswer?: string[] | null;
}

const RankingQuestion: React.FC<RankingQuestionProps> = ({
  question,
  onAnswer,
  currentAnswer,
}) => {
  const [items, setItems] = useState<{ id: string; value: string; rank: number }[]>([]);

  // Initialize items from question or currentAnswer
  useEffect(() => {
    if (!question.rankingItems) return;
    
    let initialItems;
    
    // If we have a current answer, use it to determine initial order
    if (currentAnswer && Array.isArray(currentAnswer)) {
      initialItems = currentAnswer.map((value, index) => {
        const item = question.rankingItems?.find((item) => item.value === value);
        return {
          id: item?.id || `id-${index}`,
          value: value,
          rank: index + 1,
        };
      });
      
      // Add any missing items from question.rankingItems at the end
      const includedValues = initialItems.map(item => item.value);
      const missingItems = question.rankingItems
        .filter(item => !includedValues.includes(item.value))
        .map((item, index) => ({
          id: item.id,
          value: item.value,
          rank: initialItems.length + index + 1
        }));
      
      initialItems = [...initialItems, ...missingItems];
    } else {
      // Otherwise, use the default order from question
      initialItems = question.rankingItems.map((item, index) => ({
        id: item.id,
        value: item.value,
        rank: index + 1,
      }));
    }
    
    setItems(initialItems);
  }, [question, currentAnswer]);

  // Update ranks when an item is dragged to a new position
  const moveItem = (draggedId: string, targetId: string) => {
    if (draggedId === targetId) return;

    const draggedItem = items.find((item) => item.id === draggedId);
    const targetItem = items.find((item) => item.id === targetId);

    if (!draggedItem || !targetItem) return;

    const draggedRank = draggedItem.rank;
    const targetRank = targetItem.rank;

    const updatedItems = items.map((item) => {
      if (item.id === draggedId) {
        return { ...item, rank: targetRank };
      } else if (
        targetRank < draggedRank &&
        item.rank >= targetRank &&
        item.rank < draggedRank
      ) {
        return { ...item, rank: item.rank + 1 };
      } else if (
        targetRank > draggedRank &&
        item.rank <= targetRank &&
        item.rank > draggedRank
      ) {
        return { ...item, rank: item.rank - 1 };
      }
      return item;
    });

    setItems(updatedItems);
    
    // Pass the sorted items to the parent component
    const sortedItems = [...updatedItems]
      .sort((a, b) => a.rank - b.rank)
      .map((item) => item.value);
      
    onAnswer(sortedItems);
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("text/plain");
    moveItem(draggedId, targetId);
  };

  const handleMoveUp = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item || item.rank === 1) return;
    
    const targetItem = items.find((i) => i.rank === item.rank - 1);
    if (targetItem) {
      moveItem(id, targetItem.id);
    }
  };

  const handleMoveDown = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item || item.rank === items.length) return;
    
    const targetItem = items.find((i) => i.rank === item.rank + 1);
    if (targetItem) {
      moveItem(id, targetItem.id);
    }
  };

  // Sort items by rank for display
  const sortedItems = [...items].sort((a, b) => a.rank - b.rank);

  return (
    <div className="space-y-4 w-full">
      <label className="block text-lg font-medium">
        {question.text} {question.required && <span className="text-red-500">*</span>}
      </label>
      <p className="text-sm text-gray-500 mb-2">
        Faites glisser les éléments pour les réorganiser par ordre de préférence
      </p>
      <ul className="space-y-2">
        {sortedItems.map((item) => (
          <li
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, item.id)}
            className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between cursor-grab hover:bg-gray-100"
          >
            <div className="flex items-center">
              <span className="mr-4 w-6 h-6 flex items-center justify-center bg-violet-100 text-violet-800 rounded-full">
                {item.rank}
              </span>
              <span>{item.value}</span>
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => handleMoveUp(item.id)}
                disabled={item.rank === 1}
                className={`p-1 rounded-md ${
                  item.rank === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-200"
                }`}
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => handleMoveDown(item.id)}
                disabled={item.rank === items.length}
                className={`p-1 rounded-md ${
                  item.rank === items.length
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-200"
                }`}
              >
                ↓
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankingQuestion;
