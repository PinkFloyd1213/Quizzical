
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="hidden">
      {/* Hidden input that will be triggered programmatically */}
      <input
        type="file"
        accept=".json"
        onChange={handleFileChange}
        id="hidden-file-input"
      />
    </div>
  );
};

export default QuestionDataManager;
