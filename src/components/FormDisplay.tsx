
import React, { useState, useEffect } from "react";
import { Question, FormResponse, FormSettings } from "../types/question";
import { loadQuestions, saveResponse, loadFormSettings } from "../utils/fileUtils";
import TextQuestion from "./QuestionTypes/TextQuestion";
import BooleanQuestion from "./QuestionTypes/BooleanQuestion";
import MultipleChoiceQuestion from "./QuestionTypes/MultipleChoiceQuestion";
import ImageChoiceQuestion from "./QuestionTypes/ImageChoiceQuestion";
import ColorChoiceQuestion from "./QuestionTypes/ColorChoiceQuestion";
import RankingQuestion from "./QuestionTypes/RankingQuestion";
import { useToast } from "../components/ui/use-toast";

const FormDisplay: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [responses, setResponses] = useState<Record<string, string | string[] | null>>({});
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formSettings, setFormSettings] = useState<FormSettings>({ collectRespondentInfo: false });
  const [respondentName, setRespondentName] = useState<string>("");
  const [askingForRespondentInfo, setAskingForRespondentInfo] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const loadedQuestions = await loadQuestions();
        setQuestions(loadedQuestions);
        
        // Shuffle questions
        const shuffled = [...loadedQuestions].sort(() => Math.random() - 0.5);
        setShuffledQuestions(shuffled);
        
        // Load form settings
        const settings = await loadFormSettings();
        setFormSettings(settings);
        
        // Check if we need to ask for respondent info
        if (settings.collectRespondentInfo) {
          setAskingForRespondentInfo(true);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleAnswer = (questionId: string, answer: string | string[] | null) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    // Handle respondent info collection first
    if (askingForRespondentInfo) {
      if (!respondentName.trim()) {
        toast({
          title: "Information requise",
          description: "Veuillez saisir votre nom et prénom avant de continuer.",
          variant: "destructive",
        });
        return;
      }
      
      setAskingForRespondentInfo(false);
      return;
    }
    
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    
    // Check if current question is required but not answered
    if (currentQuestion.required && 
        (responses[currentQuestion.id] === undefined || 
         responses[currentQuestion.id] === null || 
         (Array.isArray(responses[currentQuestion.id]) && responses[currentQuestion.id]?.length === 0))) {
      toast({
        title: "Réponse requise",
        description: "Veuillez répondre à cette question avant de continuer.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (askingForRespondentInfo) {
      // Can't go back from respondent info screen
      return;
    }
    
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (formSettings.collectRespondentInfo) {
      setAskingForRespondentInfo(true);
    }
  };

  const handleSubmit = async () => {
    const formattedResponses: FormResponse[] = Object.entries(responses).map(
      ([questionId, answer]) => {
        const question = questions.find((q) => q.id === questionId);
        return {
          questionId,
          questionText: question?.text || "Question inconnue",
          answer,
          timestamp: new Date().toISOString(),
          respondentName: formSettings.collectRespondentInfo ? respondentName : undefined
        };
      }
    );

    try {
      await saveResponse(formattedResponses);
      setFormSubmitted(true);
      toast({
        title: "Formulaire soumis",
        description: "Merci pour vos réponses!",
      });
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la soumission du formulaire.",
        variant: "destructive",
      });
    }
  };

  const renderQuestion = (question: Question) => {
    const currentAnswer = responses[question.id];
    
    switch (question.type) {
      case "text":
        return (
          <TextQuestion
            question={question}
            onAnswer={(answer) => handleAnswer(question.id, answer)}
            currentAnswer={currentAnswer as string}
          />
        );
      case "boolean":
        return (
          <BooleanQuestion
            question={question}
            onAnswer={(answer) => handleAnswer(question.id, answer)}
            currentAnswer={currentAnswer as string}
          />
        );
      case "multiple-choice":
        return (
          <MultipleChoiceQuestion
            question={question}
            onAnswer={(answer) => handleAnswer(question.id, answer)}
            currentAnswer={currentAnswer}
          />
        );
      case "image-choice":
        return (
          <ImageChoiceQuestion
            question={question}
            onAnswer={(answer) => handleAnswer(question.id, answer)}
            currentAnswer={currentAnswer}
          />
        );
      case "color-choice":
        return (
          <ColorChoiceQuestion
            question={question}
            onAnswer={(answer) => handleAnswer(question.id, answer)}
            currentAnswer={currentAnswer}
          />
        );
      case "ranking":
        return (
          <RankingQuestion
            question={question}
            onAnswer={(answer) => handleAnswer(question.id, answer)}
            currentAnswer={currentAnswer as string[]}
          />
        );
      default:
        return <p>Type de question non pris en charge</p>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  if (shuffledQuestions.length === 0) {
    return (
      <div className="text-center p-8 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Aucune question disponible</h2>
        <p className="text-gray-500">
          Le formulaire ne contient pas encore de questions. Veuillez ajouter des questions via la page d'administration.
        </p>
        <a
          href="/admin"
          className="mt-4 inline-block px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
        >
          Aller à la page d'administration
        </a>
      </div>
    );
  }

  if (formSubmitted) {
    return (
      <div className="text-center p-8 max-w-md mx-auto">
        <div className="mb-6 mx-auto w-20 h-20 flex items-center justify-center bg-green-100 rounded-full">
          <svg
            className="w-10 h-10 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">Merci pour vos réponses!</h2>
        <p className="text-gray-500 mb-6">
          Vos réponses ont été enregistrées avec succès.
        </p>
        <button
          onClick={() => {
            setResponses({});
            setFormSubmitted(false);
            setCurrentQuestionIndex(0);
            setRespondentName("");
            if (formSettings.collectRespondentInfo) {
              setAskingForRespondentInfo(true);
            }
            
            // Re-shuffle questions
            const shuffled = [...questions].sort(() => Math.random() - 0.5);
            setShuffledQuestions(shuffled);
          }}
          className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
        >
          Remplir à nouveau
        </button>
      </div>
    );
  }

  if (askingForRespondentInfo) {
    return (
      <div className="max-w-2xl mx-auto p-4 md:p-8 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-6">Merci de vous identifier</h2>
        
        <div className="mb-6">
          <label htmlFor="respondent-name" className="block text-sm font-medium text-gray-700 mb-1">
            Nom et prénom
          </label>
          <input
            type="text"
            id="respondent-name"
            value={respondentName}
            onChange={(e) => setRespondentName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Entrez votre nom et prénom..."
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            Commencer le questionnaire
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 bg-white rounded-lg shadow">
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
        <div
          className="h-full bg-violet-600 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Question counter */}
      <div className="text-sm text-gray-500 mb-6">
        Question {currentQuestionIndex + 1}/{shuffledQuestions.length}
      </div>
      
      {/* Question display */}
      <div className="min-h-[300px] flex flex-col">
        {renderQuestion(currentQuestion)}
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={handlePrevious}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentQuestionIndex > 0 || formSettings.collectRespondentInfo
              ? "bg-gray-200 hover:bg-gray-300"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          disabled={currentQuestionIndex === 0 && !formSettings.collectRespondentInfo}
        >
          Précédent
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
        >
          {currentQuestionIndex < shuffledQuestions.length - 1
            ? "Suivant"
            : "Terminer"}
        </button>
      </div>
    </div>
  );
};

export default FormDisplay;
