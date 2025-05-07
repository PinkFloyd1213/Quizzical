
import React, { useState, useEffect } from "react";
import { useToast } from "../../hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

interface AdminLoginProps {
  onLogin: (password: string) => void;
  onOpenPasswordDialog: () => void;
  isFirstLogin: boolean;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ 
  onLogin, 
  onOpenPasswordDialog, 
  isFirstLogin 
}) => {
  const [password, setPassword] = useState<string>("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  useEffect(() => {
    // Si c'est la première connexion, ouvrir automatiquement la boîte de dialogue de changement de mot de passe
    if (isFirstLogin) {
      onOpenPasswordDialog();
    }
  }, [isFirstLogin, onOpenPasswordDialog]);

  return (
    <div className="max-w-md mx-auto p-6 mt-20">
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/lovable-uploads/7bc3deed-7736-467c-b3e6-c4701bc2f6fa.png" 
              alt="Logo Quizzical" 
              className="h-16 mr-3"
            />
          </div>
          <CardTitle className="text-2xl text-center">Administration</CardTitle>
          <CardDescription className="text-center">
            Connectez-vous pour gérer votre formulaire
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Mot de passe par défaut : 12345
              </p>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            >
              Se connecter
            </button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-xs text-center text-gray-500">
            La première connexion vous demandera de changer le mot de passe par défaut
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
