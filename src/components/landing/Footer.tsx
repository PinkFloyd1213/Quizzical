
import React from "react";
import { Github } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 text-center text-sm text-gray-500 border-t border-gray-200 pt-8">
      <p className="mb-1">
        Quizicall - Système de formulaire 100% local - 2025
      </p>
      <div className="flex justify-center items-center mt-2">
        <a 
          href="https://github.com/PinkFloyd1213/Quizzicall" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
          aria-label="GitHub repository"
        >
          <Github size={20} />
          <span>GitHub</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
