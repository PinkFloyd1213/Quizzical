
import React from "react";
import { Question } from "../../types/question";
import QuestionList from "./QuestionList";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useToast } from "../../hooks/use-toast";

interface QuestionsTabProps {
  questions: Question[];
  onUpdateQuestions: (questions: Question[]) => void;
  onImportQuestions: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExportQuestions: () => void;
  onDownloadTemplate: () => void;
  loading: boolean;
}

const QuestionsTab: React.FC<QuestionsTabProps> = ({
  questions,
  onUpdateQuestions,
  onImportQuestions,
  onExportQuestions,
  onDownloadTemplate,
  loading
}) => {
  const { toast } = useToast();

  const handleClearAllQuestions = async () => {
    try {
      await onUpdateQuestions([]);
      toast({
        title: "Succès",
        description: "Toutes les questions ont été supprimées",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression des questions:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer les questions",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex space-x-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                Supprimer toutes les questions
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Êtes-vous absolument sûr?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irréversible. Elle supprimera définitivement toutes vos questions et ne peut pas être annulée.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearAllQuestions} className="bg-red-600 hover:bg-red-700">
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        
        <div className="flex space-x-2 flex-wrap gap-2">
          <button
            onClick={onDownloadTemplate}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Télécharger template
          </button>
          
          <label className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg cursor-pointer transition-colors">
            Importer (JSON)
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={onImportQuestions}
            />
          </label>
          
          <button
            onClick={onExportQuestions}
            disabled={questions.length === 0}
            className={`px-4 py-2 rounded-lg transition-colors ${
              questions.length === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            Exporter (JSON)
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
        </div>
      ) : (
        <QuestionList questions={questions} onUpdate={onUpdateQuestions} />
      )}
    </div>
  );
};

export default QuestionsTab;
