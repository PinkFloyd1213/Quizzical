
import { Question, FormResponse } from "../types/question";

export const saveQuestions = async (questions: Question[]): Promise<boolean> => {
  try {
    // Dans un environnement navigateur, nous utilisons une API simulée
    // puisque nous ne pouvons pas écrire directement dans le système de fichiers
    localStorage.setItem("questions", JSON.stringify(questions));
    console.log("Questions sauvegardées avec succès");
    return true;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des questions:", error);
    return false;
  }
};

export const loadQuestions = async (): Promise<Question[]> => {
  try {
    const questionsData = localStorage.getItem("questions");
    if (!questionsData) return [];
    return JSON.parse(questionsData);
  } catch (error) {
    console.error("Erreur lors du chargement des questions:", error);
    return [];
  }
};

export const saveResponse = async (responses: FormResponse[]): Promise<boolean> => {
  try {
    // Format textuel pour les réponses
    const formattedResponses = responses.map(response => {
      const answer = Array.isArray(response.answer) 
        ? response.answer.join(", ") 
        : response.answer?.toString() || "Pas de réponse";
      
      return `Question: ${response.questionText}\nRéponse: ${answer}\nTimestamp: ${response.timestamp}\n-------------------------`;
    }).join("\n");
    
    // Dans un environnement navigateur, nous utilisons une API simulée
    const existingResponses = localStorage.getItem("responses") || "";
    localStorage.setItem("responses", existingResponses + "\n" + formattedResponses);
    
    console.log("Réponse sauvegardée avec succès");
    return true;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de la réponse:", error);
    return false;
  }
};

export const loadResponses = async (): Promise<string> => {
  try {
    return localStorage.getItem("responses") || "";
  } catch (error) {
    console.error("Erreur lors du chargement des réponses:", error);
    return "";
  }
};

export const downloadResponsesAsTextFile = () => {
  const responses = localStorage.getItem("responses") || "";
  const blob = new Blob([responses], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "reponses.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const downloadQuestionsAsJsonFile = () => {
  const questions = localStorage.getItem("questions") || "[]";
  const blob = new Blob([questions], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "questions.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const importQuestionsFromJsonFile = (file: File): Promise<Question[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const questions = JSON.parse(e.target?.result as string);
        resolve(questions);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};

export const clearResponses = async (): Promise<boolean> => {
  try {
    localStorage.removeItem("responses");
    console.log("Réponses supprimées avec succès");
    return true;
  } catch (error) {
    console.error("Erreur lors de la suppression des réponses:", error);
    return false;
  }
};

export const downloadQuestionTemplateAsJsonFile = () => {
  // Créer un template avec tous les types de questions possibles
  const template: Question[] = [
    {
      id: "template-text-1",
      text: "Question texte (obligatoire)",
      type: "text",
      required: true
    },
    {
      id: "template-text-2",
      text: "Question texte (optionnelle)",
      type: "text",
      required: false
    },
    {
      id: "template-boolean-1",
      text: "Question oui/non (obligatoire)",
      type: "boolean",
      required: true
    },
    {
      id: "template-boolean-2",
      text: "Question oui/non (optionnelle)",
      type: "boolean",
      required: false
    },
    {
      id: "template-multiple-choice-1",
      text: "Question à choix unique (obligatoire)",
      type: "multiple-choice",
      required: true,
      multipleSelection: false,
      choices: [
        { id: "choice-1", value: "Option 1" },
        { id: "choice-2", value: "Option 2" },
        { id: "choice-3", value: "Option 3" }
      ]
    },
    {
      id: "template-multiple-choice-2",
      text: "Question à choix multiples (optionnelle)",
      type: "multiple-choice",
      required: false,
      multipleSelection: true,
      choices: [
        { id: "choice-4", value: "Option A" },
        { id: "choice-5", value: "Option B" },
        { id: "choice-6", value: "Option C" }
      ]
    },
    {
      id: "template-image-choice-1",
      text: "Question à choix d'image unique (obligatoire)",
      type: "image-choice",
      required: true,
      multipleSelection: false,
      imageChoices: [
        { id: "img-1", url: "https://via.placeholder.com/150", alt: "Image 1" },
        { id: "img-2", url: "https://via.placeholder.com/150", alt: "Image 2" },
        { id: "img-3", url: "https://via.placeholder.com/150", alt: "Image 3" }
      ]
    },
    {
      id: "template-image-choice-2",
      text: "Question à choix d'images multiples (optionnelle)",
      type: "image-choice",
      required: false,
      multipleSelection: true,
      imageChoices: [
        { id: "img-4", url: "https://via.placeholder.com/150", alt: "Image A" },
        { id: "img-5", url: "https://via.placeholder.com/150", alt: "Image B" },
        { id: "img-6", url: "https://via.placeholder.com/150", alt: "Image C" }
      ]
    },
    {
      id: "template-color-choice-1",
      text: "Question à choix de couleur unique (obligatoire)",
      type: "color-choice",
      required: true,
      multipleSelection: false,
      colorChoices: [
        { id: "color-1", color: "#FF0000", name: "Rouge" },
        { id: "color-2", color: "#00FF00", name: "Vert" },
        { id: "color-3", color: "#0000FF", name: "Bleu" }
      ]
    },
    {
      id: "template-color-choice-2",
      text: "Question à choix de couleurs multiples (optionnelle)",
      type: "color-choice",
      required: false,
      multipleSelection: true,
      colorChoices: [
        { id: "color-4", color: "#FFFF00", name: "Jaune" },
        { id: "color-5", color: "#FF00FF", name: "Magenta" },
        { id: "color-6", color: "#00FFFF", name: "Cyan" }
      ]
    },
    {
      id: "template-ranking-1",
      text: "Question de classement (obligatoire)",
      type: "ranking",
      required: true,
      rankingItems: [
        { id: "rank-1", value: "Élément 1" },
        { id: "rank-2", value: "Élément 2" },
        { id: "rank-3", value: "Élément 3" }
      ]
    },
    {
      id: "template-ranking-2",
      text: "Question de classement (optionnelle)",
      type: "ranking",
      required: false,
      rankingItems: [
        { id: "rank-4", value: "Élément A" },
        { id: "rank-5", value: "Élément B" },
        { id: "rank-6", value: "Élément C" }
      ]
    }
  ];
  
  const blob = new Blob([JSON.stringify(template, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "template_questions.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const saveAdminPassword = (password: string): void => {
  try {
    localStorage.setItem("admin_password", password);
    console.log("Mot de passe administrateur sauvegardé avec succès");
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du mot de passe:", error);
  }
};

export const getAdminPassword = (): string => {
  return localStorage.getItem("admin_password") || "12345";
};
