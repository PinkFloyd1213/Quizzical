
import React, { useState, useEffect } from "react";
import { Question } from "../types/question";
import QuestionList from "../components/admin/QuestionList";
import ResponseViewer from "../components/admin/ResponseViewer";
import { 
  loadQuestions, 
  saveQuestions, 
  downloadQuestionsAsJsonFile, 
  downloadQuestionTemplateAsJsonFile,
  importQuestionsFromJsonFile, 
  clearResponses, 
  saveAdminPassword,
  getAdminPassword
} from "../utils/fileUtils";
import { useToast } from "../components/ui/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../components/ui/alert-dialog";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog";

const Admin: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"questions" | "responses">("questions");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const currentPassword = getAdminPassword();
    
    if (password === currentPassword) {
      setIsAuthenticated(true);
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté à l'interface d'administration",
      });
    } else {
      toast({
        title: "Erreur de connexion",
        description: "Mot de passe incorrect",
        variant: "destructive",
      });
    }
  };

  const handleClearAllQuestions = async () => {
    try {
      await saveQuestions([]);
      setQuestions([]);
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

  const handleChangePassword = () => {
    if (!newPassword) {
      toast({
        title: "Erreur",
        description: "Le nouveau mot de passe ne peut pas être vide",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }
    
    saveAdminPassword(newPassword);
    setIsPasswordDialogOpen(false);
    setNewPassword("");
    setConfirmPassword("");
    
    toast({
      title: "Succès",
      description: "Le mot de passe administrateur a été modifié",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto p-6 mt-20 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Administration</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            Se connecter
          </button>
        </form>
      </div>
    );
  }

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
            <button
              onClick={() => setIsPasswordDialogOpen(true)}
              className="text-violet-600 hover:underline"
            >
              Changer le mot de passe
            </button>
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
                onClick={handleDownloadTemplate}
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

      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Changer le mot de passe administrateur</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="new-password" className="block text-sm font-medium">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirm-password" className="block text-sm font-medium">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleChangePassword}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
