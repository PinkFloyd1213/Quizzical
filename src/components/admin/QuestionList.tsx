
import React, { useState } from "react";
import { Question } from "../../types/question";
import QuestionForm from "./QuestionForm";
import QuestionItem from "./list/QuestionItem";
import EmptyQuestionsList from "./list/EmptyQuestionsList";

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
        <EmptyQuestionsList />
      ) : (
        <ul className="space-y-4">
          {questions.map((question, index) => (
            editing === question.id ? (
              <li key={question.id} className="border rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-50">
                  <h3 className="text-lg font-medium mb-4">Modifier la question</h3>
                  <QuestionForm
                    initialQuestion={question}
                    onSave={handleSave}
                    onCancel={handleCancel}
                  />
                </div>
              </li>
            ) : (
              <QuestionItem
                key={question.id}
                question={question}
                index={index}
                totalQuestions={questions.length}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onMoveUp={handleMoveUp}
                onMoveDown={handleMoveDown}
              />
            )
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionList;
