
import React from "react";
import { Question } from "../../types/question";
import { useToast } from "../../hooks/use-toast";
import {
  downloadQuestionsAsJsonFile,
  downloadQuestionTemplateAsJsonFile,
  importQuestionsFromJsonFile
} from "../../utils/fileUtils";

interface QuestionDataManagerProps {
  onImportQuestions: (questions: Question[]) => Promise<void>;
}

const QuestionDataManager: React.FC<QuestionDataManagerProps> = ({ onImportQuestions }) => {
  const { toast } = useToast();

  const handleExportQuestions = () => {
    downloadQuestionsAsJsonFile();
    toast({
      title: "Export réussi",
      description: "Les questions ont été exportées au format JSON",
    });
  };

  const handleDownloadTemplate = () => {
    downloadQuestionTemplateAsJsonFile();
    toast({
      title: "Téléchargement réussi",
      description: "Le template de questions a été téléchargé",
    });
  };

  const handleImportQuestions = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const importedQuestions = await importQuestionsFromJsonFile(file);
      await onImportQuestions(importedQuestions);
    } catch (error) {
      console.error("Erreur lors de l'importation des questions:", error);
      toast({
        title: "Erreur d'importation",
        description: "Le fichier sélectionné n'est pas valide",
        variant: "destructive",
      });
    }
    
    // Reset the input value to allow importing the same file again if needed
    e.target.value = "";
  };

  return (
    <div>
      {/* This component is used for its hooks but UI is rendered in QuestionsTab */}
    </div>
  );
};

export default QuestionDataManager;
