
import React, { useState } from "react";
import { useToast } from "../../hooks/use-toast";

interface AdminLoginProps {
  onLogin: (password: string) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState<string>("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-20 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Administration</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
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
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
