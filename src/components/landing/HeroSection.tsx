
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ClipboardList, Settings } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <header className="mb-16 text-center">
      <div className="flex items-center justify-center mb-6">
        <img 
          src="/lovable-uploads/7bc3deed-7736-467c-b3e6-c4701bc2f6fa.png" 
          alt="Logo Quizzical" 
          className="h-24 mr-4"
        />
      </div>
      <h2 className="text-2xl text-gray-700 font-light max-w-2xl mx-auto mt-4">
        Créez des formulaires interactifs 100% locaux, sans serveur ni base de données
      </h2>
      <div className="flex flex-wrap gap-4 justify-center mt-8">
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
    </header>
  );
};

export default HeroSection;
