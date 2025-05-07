
import React from "react";
import { FormSettings } from "../../types/question";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { KeyRound } from "lucide-react";

interface FormSettingsProps {
  settings: FormSettings;
  onUpdateSettings: (settings: FormSettings) => void;
  onOpenPasswordDialog: () => void;
}

const FormSettingsComponent: React.FC<FormSettingsProps> = ({ 
  settings, 
  onUpdateSettings,
  onOpenPasswordDialog 
}) => {
  return (
    <div className="space-y-8">
      <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Paramètres du formulaire</h2>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="collect-respondent-info" 
            checked={settings.collectRespondentInfo}
            onCheckedChange={(checked) => 
              onUpdateSettings({ 
                ...settings, 
                collectRespondentInfo: checked === true 
              })
            }
          />
          <Label 
            htmlFor="collect-respondent-info"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Demander le nom et prénom au début du questionnaire
          </Label>
        </div>
      </div>

      <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Sécurité</h2>
        
        <Button 
          onClick={onOpenPasswordDialog}
          variant="outline" 
          className="flex items-center gap-2"
        >
          <KeyRound className="h-4 w-4" />
          Changer le mot de passe administrateur
        </Button>
      </div>
    </div>
  );
};

export default FormSettingsComponent;
