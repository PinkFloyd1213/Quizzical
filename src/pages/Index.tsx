
import React from "react";
import FormDisplay from "../components/FormDisplay";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-8 text-center flex flex-col items-center">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/lovable-uploads/1bbf8a9a-7b07-4e8b-b91c-346c8356ade6.png" 
              alt="Logo Quizzical" 
              className="h-16 mr-3"
            />
            <h1 className="text-3xl font-bold text-gray-800">Formulaire de questions</h1>
          </div>
          <p className="text-gray-600">
            Merci de prendre le temps de répondre à ces questions.
          </p>
        </header>

        <FormDisplay />
        
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p className="mb-1">
            Formulaire créé avec Quizzical
          </p>
          <a
            href="/admin"
            className="text-violet-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Administration
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Index;
