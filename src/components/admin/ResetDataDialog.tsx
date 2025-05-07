
import React from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

interface ResetDataDialogProps {
  onResetData: () => void;
}

const ResetDataDialog: React.FC<ResetDataDialogProps> = ({ onResetData }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="bg-red-600 hover:bg-red-700 flex items-center gap-2">
          <Trash2 className="h-4 w-4" />
          Réinitialiser toutes les données
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Réinitialisation complète</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action va supprimer définitivement toutes les données locales : questions, réponses, paramètres et réinitialiser le mot de passe admin à sa valeur par défaut (12345).
            <br /><br />
            Cette action est irréversible et ne peut pas être annulée.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={onResetData} className="bg-red-600 hover:bg-red-700">
            Réinitialiser tout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ResetDataDialog;
