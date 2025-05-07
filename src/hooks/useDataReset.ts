
import { useState } from "react";
import { useToast } from "../hooks/use-toast";
import { resetAllLocalData, loadQuestions, loadFormSettings } from "../utils/fileUtils";

export const useDataReset = (
  setQuestions: (questions: any[]) => void,
  setFormSettings: (settings: any) => void,
  setActiveTab: (tab: "questions" | "responses" | "settings") => void
) => {
  const { toast } = useToast();

  const handleResetAllData = async () => {
    try {
      await resetAllLocalData();
      
      // Recharger les données après réinitialisation
      const loadedQuestions = await loadQuestions();
      setQuestions(loadedQuestions);
      
      const settings = await loadFormSettings();
      setFormSettings(settings);
      
      setActiveTab("questions");
      
      toast({
        title: "Réinitialisation réussie",
        description: "Toutes les données ont été supprimées et réinitialisées",
      });
      
      return true;
    } catch (error) {
      console.error("Erreur lors de la réinitialisation des données:", error);
      toast({
        title: "Erreur",
        description: "Impossible de réinitialiser les données",
        variant: "destructive",
      });
      return false;
    }
  };

  return { handleResetAllData };
};
