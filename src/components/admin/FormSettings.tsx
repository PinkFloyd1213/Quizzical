
import React from "react";
import { FormSettings as FormSettingsType } from "../../types/question";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface FormSettingsProps {
  settings: FormSettingsType;
  onUpdateSettings: (settings: FormSettingsType) => void;
}

const FormSettings: React.FC<FormSettingsProps> = ({ 
  settings, 
  onUpdateSettings 
}) => {
  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-xl font-semibold">Paramètres du formulaire</h2>
      
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
  );
};

export default FormSettings;
