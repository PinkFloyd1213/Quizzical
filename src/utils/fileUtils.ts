
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
