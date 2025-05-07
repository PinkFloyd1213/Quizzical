
import React from "react";
import FormDisplay from "../components/FormDisplay";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Form: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-8 text-center flex flex-col items-center">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/lovable-uploads/7bc3deed-7736-467c-b3e6-c4701bc2f6fa.png" 
              alt="Logo Quizicall" 
              className="h-16 mr-3"
            />
            <h1 className="text-3xl font-bold text-violet-800">Formulaire de questions</h1>
          </div>
          <p className="text-gray-600">
            Merci de prendre le temps de répondre à ces questions.
          </p>
        </header>

        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>

        <FormDisplay />
        
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p className="mb-1">
            Formulaire créé avec Quizicall
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Form;
