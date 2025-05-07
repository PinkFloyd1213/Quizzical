import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, Settings, CheckSquare, Image, List, Radio } from "lucide-react";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Hero Section */}
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/lovable-uploads/1bbf8a9a-7b07-4e8b-b91c-346c8356ade6.png" 
              alt="Logo Quizzical" 
              className="h-20 mr-3"
            />
            <h1 className="text-4xl font-bold text-violet-800">Quizzical</h1>
          </div>
          <h2 className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Créez des formulaires interactifs sans serveur, avec stockage local des réponses
          </h2>
        </header>

        {/* Main Content */}
        <div className="mb-16">
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Comment ça fonctionne ?</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Quizzical est une application qui fonctionne entièrement côté client, sans serveur ni base de données.
                Les questions et réponses sont stockées dans le localStorage de votre navigateur.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <Card className="border-violet-100 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-violet-700">
                    <ClipboardList className="h-5 w-5" />
                    Créez votre formulaire
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Ajoutez différents types de questions selon vos besoins depuis l'interface d'administration.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-violet-100 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-violet-700">
                    <Settings className="h-5 w-5" />
                    Partagez le formulaire
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Envoyez le lien à vos utilisateurs pour qu'ils puissent remplir le formulaire facilement.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-violet-100 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-violet-700">
                    <CheckSquare className="h-5 w-5" />
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
          
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Types de questions supportés</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Quizzical propose différents formats de questions pour s'adapter à vos besoins.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-violet-100">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-violet-700">
                    <List className="h-5 w-5" />
                    Questions ouvertes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Champs de texte pour les réponses libres et descriptives.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-violet-100">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-violet-700">
                    <CheckSquare className="h-5 w-5" />
                    Choix multiples
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Cases à cocher ou boutons radio pour sélectionner une ou plusieurs options.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-violet-100">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-violet-700">
                    <Image className="h-5 w-5" />
                    Choix d'images
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Sélectionnez parmi des options visuelles pour un formulaire plus interactif.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-violet-100">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-violet-700">
                    <Radio className="h-5 w-5" />
                    Questions fermées
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Réponses simples de type Oui/Non pour des questions directes.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-violet-100">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-violet-700">
                    <Settings className="h-5 w-5" />
                    Classement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Ordonnez des options par préférence ou importance.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-violet-100">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-violet-700">
                    <Settings className="h-5 w-5" />
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

          <section className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Prêt à commencer ?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Accédez au formulaire pour répondre aux questions ou à l'interface d'administration pour créer et gérer vos questions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/form">
                <Button size="lg" className="bg-violet-600 hover:bg-violet-700">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Accéder au formulaire
                </Button>
              </Link>
              <Link to="/admin">
                <Button size="lg" variant="outline" className="border-violet-600 text-violet-600 hover:bg-violet-50">
                  <Settings className="mr-2 h-4 w-4" />
                  Administration
                </Button>
              </Link>
            </div>
          </section>
        </div>
        
        <footer className="mt-12 text-center text-sm text-gray-500 border-t border-gray-200 pt-6">
          <p className="mb-1">
            Quizzical - Système de formulaire local - 2025
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
