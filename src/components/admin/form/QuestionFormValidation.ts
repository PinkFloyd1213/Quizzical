
import { Question } from "../../../types/question";
import { toast } from "../../../components/ui/use-toast";

export const validateQuestion = (question: Question): boolean => {
  // Validate question text
  if (!question.text.trim()) {
    toast({
      title: "Erreur de validation",
      description: "Le texte de la question est requis",
      variant: "destructive",
    });
    return false;
  }

  // Validate based on question type
  switch (question.type) {
    case "multiple-choice":
      if (!question.choices?.length) {
        toast({
          title: "Erreur de validation",
          description: "Ajoutez au moins un choix pour cette question",
          variant: "destructive",
        });
        return false;
      }
      break;

    case "image-choice":
      if (!question.imageChoices?.length) {
        toast({
          title: "Erreur de validation",
          description: "Ajoutez au moins une image pour cette question",
          variant: "destructive",
        });
        return false;
      }
      break;

    case "color-choice":
      if (!question.colorChoices?.length) {
        toast({
          title: "Erreur de validation",
          description: "Ajoutez au moins une couleur pour cette question",
          variant: "destructive",
        });
        return false;
      }
      break;

    case "ranking":
      if (!question.rankingItems?.length || question.rankingItems.length < 2) {
        toast({
          title: "Erreur de validation",
          description: "Ajoutez au moins deux éléments à classer pour cette question",
          variant: "destructive",
        });
        return false;
      }
      break;
  }

  return true;
};
