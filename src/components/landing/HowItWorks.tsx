
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Settings, CheckSquare } from "lucide-react";

const HowItWorks: React.FC = () => {
  return (
    <section className="mb-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Comment ça fonctionne ?</h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          Quizzical est une application qui fonctionne entièrement côté client, sans serveur ni base de données.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
        <Card className="border-violet-100 shadow-lg hover:shadow-xl transition-shadow bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-violet-700">
              <ClipboardList className="h-6 w-6" />
              Créez votre formulaire
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Ajoutez différents types de questions selon vos besoins depuis l'interface d'administration.
            </p>
          </CardContent>
        </Card>

        <Card className="border-violet-100 shadow-lg hover:shadow-xl transition-shadow bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-violet-700">
              <Settings className="h-6 w-6" />
              Personnalisez l'expérience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Configurez le formulaire selon vos besoins et accédez-y directement depuis votre navigateur.
            </p>
          </CardContent>
        </Card>

        <Card className="border-violet-100 shadow-lg hover:shadow-xl transition-shadow bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-violet-700">
              <CheckSquare className="h-6 w-6" />
              Consultez les réponses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Visualisez et exportez les réponses depuis l'interface d'administration.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HowItWorks;
