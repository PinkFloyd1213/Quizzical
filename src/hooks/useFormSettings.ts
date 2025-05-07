
import { useState } from "react";
import { FormSettings } from "../types/question";
import { loadFormSettings, saveFormSettings } from "../utils/fileUtils";
import { useToast } from "../hooks/use-toast";

export const useFormSettings = () => {
  const [formSettings, setFormSettings] = useState<FormSettings>({
    collectRespondentInfo: false
  });
  const { toast } = useToast();

  const fetchFormSettings = async () => {
    try {
      const settings = await loadFormSettings();
      setFormSettings(settings);
      return settings;
    } catch (error) {
      console.error("Erreur lors du chargement des paramètres:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les paramètres",
        variant: "destructive",
      });
      return formSettings;
    }
  };

  const handleUpdateFormSettings = async (updatedSettings: FormSettings) => {
    try {
      await saveFormSettings(updatedSettings);
      setFormSettings(updatedSettings);
      toast({
        title: "Succès",
        description: "Paramètres mis à jour avec succès",
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour des paramètres:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour les paramètres",
        variant: "destructive",
      });
    }
  };

  return { 
    formSettings, 
    fetchFormSettings, 
    handleUpdateFormSettings 
  };
};
