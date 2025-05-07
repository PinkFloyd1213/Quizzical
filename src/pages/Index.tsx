
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, Settings, CheckSquare, Image, List, Radio, HardDrive, DatabaseOff, ShieldCheck } from "lucide-react";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <header className="mb-16 text-center">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/lovable-uploads/1bbf8a9a-7b07-4e8b-b91c-346c8356ade6.png" 
              alt="Logo Quizzical" 
              className="h-24 mr-4"
            />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-700 to-purple-500 text-transparent bg-clip-text">Quizzical</h1>
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

        {/* Main Content */}
        <div className="mb-16 space-y-20">
          {/* Local Storage Features */}
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
                    <DatabaseOff className="h-6 w-6" />
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
          
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Types de questions supportés</h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                Quizzical propose différents formats de questions pour s'adapter à vos besoins.
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
        </div>
        
        <footer className="mt-16 text-center text-sm text-gray-500 border-t border-gray-200 pt-8">
          <p className="mb-1">
            Quizzical - Système de formulaire 100% local - 2025
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
