import React, { useState, useEffect } from "react";
import { Question, FormSettings } from "../types/question";
import QuestionList from "../components/admin/QuestionList";
import ResponseViewer from "../components/admin/ResponseViewer";
import FormSettingsComponent from "../components/admin/FormSettings";
import AdminLogin from "../components/admin/AdminLogin";
import AdminHeader from "../components/admin/AdminHeader";
import QuestionsTab from "../components/admin/QuestionsTab";
import PasswordChangeDialog from "../components/admin/PasswordChangeDialog";
import ResetDataDialog from "../components/admin/ResetDataDialog";
import { 
  loadQuestions, 
  saveQuestions, 
  downloadQuestionsAsJsonFile, 
  downloadQuestionTemplateAsJsonFile,
  importQuestionsFromJsonFile, 
  clearResponses, 
  saveAdminPassword,
  getAdminPassword,
  loadFormSettings,
  saveFormSettings,
  resetAllLocalData
} from "../utils/fileUtils";
import { useToast } from "../hooks/use-toast";

const Admin: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"questions" | "responses" | "settings">("questions");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState<boolean>(false);
  const [isFirstLogin, setIsFirstLogin] = useState<boolean>(false);
  const [formSettings, setFormSettings] = useState<FormSettings>({
    collectRespondentInfo: false
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const loadedQuestions = await loadQuestions();
        setQuestions(loadedQuestions);
        
        const settings = await loadFormSettings();
        setFormSettings(settings);
        
        // Vérifier si c'est la première connexion (mot de passe par défaut)
        const currentPassword = getAdminPassword();
        if (currentPassword === "12345") {
          setIsFirstLogin(true);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

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

  const handleLogin = (password: string) => {
    const currentPassword = getAdminPassword();
    
    if (password === currentPassword) {
      setIsAuthenticated(true);
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté à l'interface d'administration",
      });
      
      // Si c'est la première connexion, ouvrir la boîte de dialogue de changement de mot de passe
      if (isFirstLogin) {
        setIsPasswordDialogOpen(true);
      }
    } else {
      toast({
        title: "Erreur de connexion",
        description: "Mot de passe incorrect",
        variant: "destructive",
      });
    }
  };

  const handleChangePassword = (newPassword: string) => {
    saveAdminPassword(newPassword);
    setIsPasswordDialogOpen(false);
    setIsFirstLogin(false);
    
    toast({
      title: "Succès",
      description: "Le mot de passe administrateur a été modifié",
    });
  };

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
    } catch (error) {
      console.error("Erreur lors de la réinitialisation des données:", error);
      toast({
        title: "Erreur",
        description: "Impossible de réinitialiser les données",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <AdminLogin 
        onLogin={handleLogin} 
        onOpenPasswordDialog={() => setIsPasswordDialogOpen(true)}
        isFirstLogin={isFirstLogin}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <AdminHeader 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Bouton de réinitialisation complète */}
      <div className="mb-6 flex justify-end">
        <ResetDataDialog onResetData={handleResetAllData} />
      </div>

      {activeTab === "questions" && (
        <QuestionsTab 
          questions={questions}
          onUpdateQuestions={handleUpdateQuestions}
          onImportQuestions={handleImportQuestions}
          onExportQuestions={handleExportQuestions}
          onDownloadTemplate={handleDownloadTemplate}
          loading={loading}
        />
      )}

      {activeTab === "responses" && <ResponseViewer />}
      
      {activeTab === "settings" && (
        <FormSettingsComponent 
          settings={formSettings}
          onUpdateSettings={handleUpdateFormSettings}
          onOpenPasswordDialog={() => setIsPasswordDialogOpen(true)}
        />
      )}

      {/* Dialogue de changement de mot de passe */}
      <PasswordChangeDialog 
        isOpen={isPasswordDialogOpen}
        onOpenChange={setIsPasswordDialogOpen}
        onChangePassword={handleChangePassword}
        isFirstLogin={isFirstLogin}
      />
    </div>
  );
};

export default Admin;
