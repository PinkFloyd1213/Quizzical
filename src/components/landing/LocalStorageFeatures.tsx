
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, HardDrive, ShieldCheck } from "lucide-react";

const LocalStorageFeatures: React.FC = () => {
  return (
    <section className="mb-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          <span className="bg-gradient-to-r from-violet-700 to-purple-500 text-transparent bg-clip-text">100% Local</span> et Sécurisé
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          Vos données ne transitent jamais sur un serveur. Tout est stocké localement dans votre navigateur.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="border-violet-100 shadow-xl hover:shadow-2xl transition-shadow bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-violet-700">
              <Database className="h-6 w-6" />
              Sans serveur
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Aucune base de données distante. Vos données restent exclusivement sur votre appareil.
            </p>
          </CardContent>
        </Card>

        <Card className="border-violet-100 shadow-xl hover:shadow-2xl transition-shadow bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-violet-700">
              <HardDrive className="h-6 w-6" />
              Stockage local
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Le localStorage de votre navigateur est utilisé pour sauvegarder toutes les informations.
            </p>
          </CardContent>
        </Card>

        <Card className="border-violet-100 shadow-xl hover:shadow-2xl transition-shadow bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-violet-700">
              <ShieldCheck className="h-6 w-6" />
              Confidentialité
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Aucune donnée ne quitte votre navigateur. Confidentialité et sécurité garanties.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LocalStorageFeatures;
