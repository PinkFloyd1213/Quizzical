
import React from "react";
import { useToast } from "../../hooks/use-toast";
import PasswordChangeDialog from "./PasswordChangeDialog";
import { saveAdminPassword } from "../../utils/fileUtils";

interface AdminPasswordManagerProps {
  isFirstLogin: boolean;
  isPasswordDialogOpen: boolean;
  setIsPasswordDialogOpen: (open: boolean) => void;
  setIsFirstLogin: (isFirst: boolean) => void;
}

const AdminPasswordManager: React.FC<AdminPasswordManagerProps> = ({
  isFirstLogin,
  isPasswordDialogOpen,
  setIsPasswordDialogOpen,
  setIsFirstLogin
}) => {
  const { toast } = useToast();

  const handleChangePassword = (newPassword: string) => {
    saveAdminPassword(newPassword);
    setIsPasswordDialogOpen(false);
    setIsFirstLogin(false);
    
    toast({
      title: "Succès",
      description: "Le mot de passe administrateur a été modifié",
    });
    
    // Afficher un toast de bienvenue après avoir changé le mot de passe lors de la première connexion
    if (isFirstLogin) {
      setTimeout(() => {
        toast({
          title: "Bienvenue",
          description: "Vous êtes maintenant connecté à l'interface d'administration",
        });
      }, 500); // Un petit délai pour laisser le temps au toast précédent de s'afficher correctement
    }
  };

  return (
    <PasswordChangeDialog 
      isOpen={isPasswordDialogOpen}
      onOpenChange={setIsPasswordDialogOpen}
      onChangePassword={handleChangePassword}
      isFirstLogin={isFirstLogin}
    />
  );
};

export default AdminPasswordManager;
