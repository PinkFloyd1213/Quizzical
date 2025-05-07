
import React, { useState, useEffect } from "react";
import QuestionList from "../components/admin/QuestionList";
import ResponseViewer from "../components/admin/ResponseViewer";
import FormSettingsComponent from "../components/admin/FormSettings";
import AdminLogin from "../components/admin/AdminLogin";
import AdminHeader from "../components/admin/AdminHeader";
import QuestionsTab from "../components/admin/QuestionsTab";
import AdminPasswordManager from "../components/admin/AdminPasswordManager";
import ResetDataDialog from "../components/admin/ResetDataDialog";
import { useToast } from "../hooks/use-toast";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { useQuestionsData } from "../hooks/useQuestionsData";
import { useFormSettings } from "../hooks/useFormSettings";
import { useDataReset } from "../hooks/useDataReset";
import { saveQuestions, downloadQuestionsAsJsonFile, downloadQuestionTemplateAsJsonFile } from "../utils/fileUtils";

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"questions" | "responses" | "settings">("questions");
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState<boolean>(false);
  const { toast } = useToast();
  
  // Custom hooks
  const { 
    isAuthenticated, 
    setIsAuthenticated, 
    isFirstLogin, 
    setIsFirstLogin,
    handleLogin 
  } = useAdminAuth();
  
  const { 
    questions, 
    loading, 
    fetchQuestions, 
    handleUpdateQuestions 
  } = useQuestionsData();
  
  const { 
    formSettings, 
    fetchFormSettings, 
    handleUpdateFormSettings 
  } = useFormSettings();
  
  const { handleResetAllData } = useDataReset(
    (q) => handleUpdateQuestions(q), 
    handleUpdateFormSettings,
    setActiveTab
  );

  useEffect(() => {
    const fetchData = async () => {
      await fetchQuestions();
      await fetchFormSettings();
    };

    fetchData();
  }, []);

  const onLogin = (password: string) => {
    const success = handleLogin(password);
    
    if (success) {
      // Ne pas afficher le toast de connexion réussie si c'est la première connexion
      if (!isFirstLogin) {
        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté à l'interface d'administration",
        });
      }
      
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

  const handleImportQuestions = async (importedQuestions: any[]) => {
    try {
      await saveQuestions(importedQuestions);
      await fetchQuestions(); // Refresh the questions list
      toast({
        title: "Import réussi",
        description: `${importedQuestions.length} question(s) importée(s) avec succès`,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour après import:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour les questions après import",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <AdminLogin 
        onLogin={onLogin} 
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

      <AdminPasswordManager
        isFirstLogin={isFirstLogin}
        isPasswordDialogOpen={isPasswordDialogOpen}
        setIsPasswordDialogOpen={setIsPasswordDialogOpen}
        setIsFirstLogin={setIsFirstLogin}
      />
    </div>
  );
};

export default Admin;
