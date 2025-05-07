
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ClipboardList, Settings } from "lucide-react";

const CallToAction: React.FC = () => {
  return (
    <section className="text-center bg-violet-50 py-12 px-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Prêt à commencer ?</h2>
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
        Accédez au formulaire pour répondre aux questions ou à l'interface d'administration pour créer et gérer vos questions.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <Link to="/form">
          <Button size="lg" className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg">
            <ClipboardList className="mr-2 h-5 w-5" />
            Accéder au formulaire
          </Button>
        </Link>
        <Link to="/admin">
          <Button size="lg" variant="outline" className="border-violet-600 text-violet-600 hover:bg-violet-50 shadow-md">
            <Settings className="mr-2 h-5 w-5" />
            Administration
          </Button>
        </Link>
      </div>
      <p className="text-sm text-gray-500 mt-4">
        Mot de passe administrateur par défaut: <strong>12345</strong>
      </p>
    </section>
  );
};

export default CallToAction;
