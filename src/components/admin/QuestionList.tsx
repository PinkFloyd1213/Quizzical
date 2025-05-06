
import React, { useState } from "react";
import { Question } from "../../types/question";
import QuestionForm from "./QuestionForm";

interface QuestionListProps {
  questions: Question[];
  onUpdate: (updatedQuestions: Question[]) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, onUpdate }) => {
  const [editing, setEditing] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  const handleEdit = (questionId: string) => {
    setEditing(questionId);
    setShowAddForm(false);
  };

  const handleDelete = (questionId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette question ?")) {
      const updatedQuestions = questions.filter(q => q.id !== questionId);
      onUpdate(updatedQuestions);
    }
  };

  const handleSave = (updatedQuestion: Question) => {
    let updatedQuestions;
    
    if (editing) {
      // Update existing question
      updatedQuestions = questions.map(q => 
        q.id === editing ? updatedQuestion : q
      );
      setEditing(null);
    } else {
      // Add new question
      updatedQuestions = [...questions, updatedQuestion];
      setShowAddForm(false);
    }
    
    onUpdate(updatedQuestions);
  };

  const handleCancel = () => {
    setEditing(null);
    setShowAddForm(false);
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    
    const updatedQuestions = [...questions];
    const temp = updatedQuestions[index];
    updatedQuestions[index] = updatedQuestions[index - 1];
    updatedQuestions[index - 1] = temp;
    
    onUpdate(updatedQuestions);
  };

  const handleMoveDown = (index: number) => {
    if (index >= questions.length - 1) return;
    
    const updatedQuestions = [...questions];
    const temp = updatedQuestions[index];
    updatedQuestions[index] = updatedQuestions[index + 1];
    updatedQuestions[index + 1] = temp;
    
    onUpdate(updatedQuestions);
  };

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Liste des questions</h2>
        <button
          onClick={() => {
            setShowAddForm(true);
            setEditing(null);
          }}
          className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
        >
          Ajouter une question
        </button>
      </div>

      {showAddForm && !editing && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Nouvelle question</h3>
          <QuestionForm onSave={handleSave} onCancel={handleCancel} />
        </div>
      )}

      {questions.length === 0 && !showAddForm ? (
        <div className="text-center p-8 border border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500">Aucune question. Cliquez sur "Ajouter une question" pour commencer.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {questions.map((question, index) => (
            <li key={question.id} className="border rounded-lg overflow-hidden">
              {editing === question.id ? (
                <div className="p-4 bg-gray-50">
                  <h3 className="text-lg font-medium mb-4">Modifier la question</h3>
                  <QuestionForm
                    initialQuestion={question}
                    onSave={handleSave}
                    onCancel={handleCancel}
                  />
                </div>
              ) : (
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{question.text}</h3>
                      <div className="flex items-center mt-1 space-x-2 text-sm text-gray-500">
                        <span className="bg-violet-100 text-violet-800 px-2 py-1 rounded">
                          {getQuestionTypeLabel(question.type)}
                        </span>
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
                        onClick={() => handleMoveUp(index)}
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
                        onClick={() => handleMoveDown(index)}
                        disabled={index === questions.length - 1}
                        className={`p-1 rounded ${
                          index === questions.length - 1
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => handleEdit(question.id)}
                        className="p-1 text-blue-600 hover:text-blue-800"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(question.id)}
                        className="p-1 text-red-600 hover:text-red-800"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>

                  {/* Preview of choices based on question type */}
                  {question.type === "multiple-choice" && question.choices && (
                    <div className="mt-3 text-sm text-gray-500">
                      <p>Options: {question.choices.map(c => c.value).join(", ")}</p>
                    </div>
                  )}

                  {question.type === "image-choice" && question.imageChoices && (
                    <div className="mt-3 text-sm text-gray-500">
                      <p>Images: {question.imageChoices.length} image(s)</p>
                    </div>
                  )}

                  {question.type === "color-choice" && question.colorChoices && (
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
                  )}

                  {question.type === "ranking" && question.rankingItems && (
                    <div className="mt-3 text-sm text-gray-500">
                      <p>Éléments à classer: {question.rankingItems.map(i => i.value).join(", ")}</p>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionList;
