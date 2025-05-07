
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { useToast } from "../../hooks/use-toast";

interface PasswordChangeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onChangePassword: (password: string) => void;
  isFirstLogin?: boolean;
}

const PasswordChangeDialog: React.FC<PasswordChangeDialogProps> = ({
  isOpen,
  onOpenChange,
  onChangePassword,
  isFirstLogin = false
}) => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { toast } = useToast();

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
    
    onChangePassword(newPassword);
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => {
        // Si c'est la première connexion, empêcher la fermeture du dialogue
        if (isFirstLogin && !open) {
          return;
        }
        onOpenChange(open);
      }}
    >
      <DialogContent 
        // Augmenter le z-index pour qu'il soit supérieur au toast (qui est à 100)
        className="z-[110]" 
        onPointerDownOutside={e => {
          // Empêcher la fermeture lors du clic à l'extérieur pour la première connexion
          if (isFirstLogin) {
            e.preventDefault();
          }
        }}
        onEscapeKeyDown={e => {
          // Empêcher la fermeture avec la touche Escape pour la première connexion
          if (isFirstLogin) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Changer le mot de passe administrateur</DialogTitle>
          {isFirstLogin && (
            <DialogDescription>
              Pour des raisons de sécurité, vous devez changer le mot de passe par défaut lors de votre première connexion.
            </DialogDescription>
          )}
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
          {!isFirstLogin && (
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
          )}
          <Button onClick={handleChangePassword}>Enregistrer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordChangeDialog;
