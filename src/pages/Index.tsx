
import React from "react";
import FormDisplay from "../components/FormDisplay";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Formulaire de questions</h1>
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
