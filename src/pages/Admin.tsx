
import React, { useState, useEffect } from "react";
import { Question } from "../types/question";
import QuestionList from "../components/admin/QuestionList";
import ResponseViewer from "../components/admin/ResponseViewer";
import { loadQuestions, saveQuestions, downloadQuestionsAsJsonFile, importQuestionsFromJsonFile } from "../utils/fileUtils";
import { useToast } from "../components/ui/use-toast";

const Admin: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"questions" | "responses">("questions");
  const { toast } = useToast();

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const loadedQuestions = await loadQuestions();
        setQuestions(loadedQuestions);
      } catch (error) {
        console.error("Erreur lors du chargement des questions:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les questions",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [toast]);

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

  const handleExportQuestions = () => {
    downloadQuestionsAsJsonFile();
    toast({
      title: "Export réussi",
      description: "Les questions ont été exportées au format JSON",
    });
  };

  const handleImportQuestions = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const importedQuestions = await importQuestionsFromJsonFile(file);
      await saveQuestions(importedQuestions);
      setQuestions(importedQuestions);
      toast({
        title: "Import réussi",
        description: `${importedQuestions.length} question(s) importée(s) avec succès`,
      });
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
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Administration du formulaire</h1>
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab("questions")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === "questions"
                  ? "bg-violet-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
            >
              Questions
            </button>
            <button
              onClick={() => setActiveTab("responses")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === "responses"
                  ? "bg-violet-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
            >
              Réponses
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <a
              href="/"
              className="text-violet-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir le formulaire
            </a>
          </div>
        </div>
      </header>

      {activeTab === "questions" && (
        <div className="space-y-6">
          <div className="flex justify-end space-x-3">
            <label className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg cursor-pointer transition-colors">
              Importer (JSON)
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleImportQuestions}
              />
            </label>
            <button
              onClick={handleExportQuestions}
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

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
            </div>
          ) : (
            <QuestionList questions={questions} onUpdate={handleUpdateQuestions} />
          )}
        </div>
      )}

      {activeTab === "responses" && <ResponseViewer />}
    </div>
  );
};

export default Admin;
