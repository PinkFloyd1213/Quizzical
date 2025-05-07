
import { useState } from "react";
import { Question } from "../types/question";
import { loadQuestions, saveQuestions } from "../utils/fileUtils";
import { useToast } from "../hooks/use-toast";

export const useQuestionsData = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const loadedQuestions = await loadQuestions();
      setQuestions(loadedQuestions);
      return loadedQuestions;
    } catch (error) {
      console.error("Erreur lors du chargement des questions:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les questions",
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuestions = async (updatedQuestions: Question[]) => {
    try {
      await saveQuestions(updatedQuestions);
      setQuestions(updatedQuestions);
      toast({
        title: "Succès",
        description: "Questions mises à jour avec succès",
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour des questions:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour les questions",
        variant: "destructive",
      });
    }
  };

  return { 
    questions, 
    loading, 
    fetchQuestions, 
    handleUpdateQuestions 
  };
};
