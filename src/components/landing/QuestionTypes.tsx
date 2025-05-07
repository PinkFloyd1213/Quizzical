
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, Image, List, Radio, Settings } from "lucide-react";

const QuestionTypes: React.FC = () => {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Types de questions supportés</h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          Quizicall propose différents formats de questions pour s'adapter à vos besoins.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-violet-100 shadow-md hover:shadow-lg transition-shadow bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-violet-700">
              <List className="h-6 w-6" />
              Questions ouvertes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Champs de texte pour les réponses libres et descriptives.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-violet-100 shadow-md hover:shadow-lg transition-shadow bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-violet-700">
              <CheckSquare className="h-6 w-6" />
              Choix multiples
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Cases à cocher ou boutons radio pour sélectionner une ou plusieurs options.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-violet-100 shadow-md hover:shadow-lg transition-shadow bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-violet-700">
              <Image className="h-6 w-6" />
              Choix d'images
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Sélectionnez parmi des options visuelles pour un formulaire plus interactif.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-violet-100 shadow-md hover:shadow-lg transition-shadow bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-violet-700">
              <Radio className="h-6 w-6" />
              Questions fermées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Réponses simples de type Oui/Non pour des questions directes.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-violet-100 shadow-md hover:shadow-lg transition-shadow bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-violet-700">
              <Settings className="h-6 w-6" />
              Classement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Ordonnez des options par préférence ou importance.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-violet-100 shadow-md hover:shadow-lg transition-shadow bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-violet-700">
              <Settings className="h-6 w-6" />
              Choix de couleurs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Sélectionnez une couleur parmi les options proposées.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default QuestionTypes;
