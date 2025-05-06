
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Question, QuestionType, Choice, ImageChoice, ColorChoice, RankingItem } from "../../types/question";
import { toast } from "../../components/ui/use-toast";

interface QuestionFormProps {
  onSave: (question: Question) => void;
  onCancel: () => void;
  initialQuestion?: Question;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  onSave,
  onCancel,
  initialQuestion,
}) => {
  const [question, setQuestion] = useState<Question>(
    initialQuestion || {
      id: uuidv4(),
      text: "",
      type: "text",
      required: false,
    }
  );

  const [choice, setChoice] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageAlt, setImageAlt] = useState<string>("");
  const [colorValue, setColorValue] = useState<string>("#4B5563");
  const [colorName, setColorName] = useState<string>("");
  const [rankingItem, setRankingItem] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === "type") {
      // Reset type-specific fields when switching question types
      setQuestion({
        ...question,
        type: value as QuestionType,
        choices: undefined,
        imageChoices: undefined,
        colorChoices: undefined,
        rankingItems: undefined,
        multipleSelection: false,
      });
    } else {
      setQuestion({
        ...question,
        [name]: name === "required" ? (e.target as HTMLInputElement).checked : value,
      });
    }
  };

  const handleMultipleSelectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion({
      ...question,
      multipleSelection: e.target.checked,
    });
  };

  const addChoice = () => {
    if (!choice.trim()) return;
    
    setQuestion({
      ...question,
      choices: [
        ...(question.choices || []),
        { id: uuidv4(), value: choice.trim() },
      ],
    });
    setChoice("");
  };

  const removeChoice = (id: string) => {
    setQuestion({
      ...question,
      choices: (question.choices || []).filter((c) => c.id !== id),
    });
  };

  const addImageChoice = () => {
    if (!imageUrl.trim()) return;
    
    setQuestion({
      ...question,
      imageChoices: [
        ...(question.imageChoices || []),
        { id: uuidv4(), url: imageUrl.trim(), alt: imageAlt.trim() || imageUrl.trim() },
      ],
    });
    setImageUrl("");
    setImageAlt("");
  };

  const removeImageChoice = (id: string) => {
    setQuestion({
      ...question,
      imageChoices: (question.imageChoices || []).filter((img) => img.id !== id),
    });
  };

  const addColorChoice = () => {
    if (!colorValue.trim() || !colorName.trim()) return;
    
    setQuestion({
      ...question,
      colorChoices: [
        ...(question.colorChoices || []),
        { id: uuidv4(), color: colorValue.trim(), name: colorName.trim() },
      ],
    });
    setColorName("");
  };

  const removeColorChoice = (id: string) => {
    setQuestion({
      ...question,
      colorChoices: (question.colorChoices || []).filter((color) => color.id !== id),
    });
  };

  const addRankingItem = () => {
    if (!rankingItem.trim()) return;
    
    setQuestion({
      ...question,
      rankingItems: [
        ...(question.rankingItems || []),
        { id: uuidv4(), value: rankingItem.trim() },
      ],
    });
    setRankingItem("");
  };

  const removeRankingItem = (id: string) => {
    setQuestion({
      ...question,
      rankingItems: (question.rankingItems || []).filter((item) => item.id !== id),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate question
    if (!question.text.trim()) {
      toast({
        title: "Erreur de validation",
        description: "Le texte de la question est requis",
        variant: "destructive",
      });
      return;
    }
    
    // Validate based on question type
    switch (question.type) {
      case "multiple-choice":
        if (!question.choices?.length) {
          toast({
            title: "Erreur de validation",
            description: "Ajoutez au moins un choix pour cette question",
            variant: "destructive",
          });
          return;
        }
        break;
      case "image-choice":
        if (!question.imageChoices?.length) {
          toast({
            title: "Erreur de validation",
            description: "Ajoutez au moins une image pour cette question",
            variant: "destructive",
          });
          return;
        }
        break;
      case "color-choice":
        if (!question.colorChoices?.length) {
          toast({
            title: "Erreur de validation",
            description: "Ajoutez au moins une couleur pour cette question",
            variant: "destructive",
          });
          return;
        }
        break;
      case "ranking":
        if (!question.rankingItems?.length || question.rankingItems.length < 2) {
          toast({
            title: "Erreur de validation",
            description: "Ajoutez au moins deux éléments à classer pour cette question",
            variant: "destructive",
          });
          return;
        }
        break;
    }
    
    onSave(question);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Question Text */}
      <div>
        <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
          Texte de la question
        </label>
        <input
          type="text"
          id="text"
          name="text"
          value={question.text}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="Entrez la question..."
          required
        />
      </div>

      {/* Question Type */}
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
          Type de question
        </label>
        <select
          id="type"
          name="type"
          value={question.type}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="text">Texte libre</option>
          <option value="boolean">Oui/Non</option>
          <option value="multiple-choice">Choix multiple</option>
          <option value="image-choice">Choix d'image(s)</option>
          <option value="color-choice">Choix de couleur(s)</option>
          <option value="ranking">Classement</option>
        </select>
      </div>

      {/* Required checkbox */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="required"
          name="required"
          checked={question.required}
          onChange={handleChange}
          className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
        />
        <label htmlFor="required" className="ml-2 block text-sm text-gray-700">
          Question obligatoire
        </label>
      </div>

      {/* Multiple selection option for choices */}
      {(question.type === "multiple-choice" ||
        question.type === "image-choice" ||
        question.type === "color-choice") && (
        <div className="flex items-center">
          <input
            type="checkbox"
            id="multipleSelection"
            checked={question.multipleSelection}
            onChange={handleMultipleSelectionChange}
            className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
          />
          <label htmlFor="multipleSelection" className="ml-2 block text-sm text-gray-700">
            Autoriser plusieurs sélections
          </label>
        </div>
      )}

      {/* Options for multiple-choice */}
      {question.type === "multiple-choice" && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Options</h3>
          {/* Add choice input */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={choice}
              onChange={(e) => setChoice(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Ajouter une option..."
            />
            <button
              type="button"
              onClick={addChoice}
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            >
              Ajouter
            </button>
          </div>

          {/* List of choices */}
          <ul className="space-y-2">
            {question.choices?.map((c) => (
              <li
                key={c.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <span>{c.value}</span>
                <button
                  type="button"
                  onClick={() => removeChoice(c.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Options for image-choice */}
      {question.type === "image-choice" && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Images</h3>
          {/* Add image input */}
          <div className="space-y-2">
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="URL de l'image..."
            />
            <input
              type="text"
              value={imageAlt}
              onChange={(e) => setImageAlt(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Description de l'image (alt)..."
            />
            <button
              type="button"
              onClick={addImageChoice}
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            >
              Ajouter l'image
            </button>
          </div>

          {/* List of image choices */}
          <div className="grid grid-cols-2 gap-4">
            {question.imageChoices?.map((img) => (
              <div
                key={img.id}
                className="relative border rounded-lg overflow-hidden"
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-32 object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImageChoice(img.id)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-700"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Options for color-choice */}
      {question.type === "color-choice" && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Couleurs</h3>
          {/* Add color input */}
          <div className="flex space-x-2 items-center">
            <input
              type="color"
              value={colorValue}
              onChange={(e) => setColorValue(e.target.value)}
              className="h-10 w-10 border-0 p-0 rounded-md"
            />
            <input
              type="text"
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Nom de la couleur (ex: Rouge)"
            />
            <button
              type="button"
              onClick={addColorChoice}
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            >
              Ajouter
            </button>
          </div>

          {/* List of color choices */}
          <div className="flex flex-wrap gap-4">
            {question.colorChoices?.map((colorChoice) => (
              <div
                key={colorChoice.id}
                className="relative flex flex-col items-center"
              >
                <div
                  className="w-12 h-12 rounded-full mb-1"
                  style={{ backgroundColor: colorChoice.color }}
                ></div>
                <span className="text-xs">{colorChoice.name}</span>
                <button
                  type="button"
                  onClick={() => removeColorChoice(colorChoice.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs hover:bg-red-700"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Options for ranking */}
      {question.type === "ranking" && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Éléments à classer</h3>
          {/* Add item input */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={rankingItem}
              onChange={(e) => setRankingItem(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Ajouter un élément..."
            />
            <button
              type="button"
              onClick={addRankingItem}
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            >
              Ajouter
            </button>
          </div>

          {/* List of ranking items */}
          <ul className="space-y-2">
            {question.rankingItems?.map((item, index) => (
              <li
                key={item.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center bg-violet-100 text-violet-800 rounded-full mr-2">
                    {index + 1}
                  </span>
                  <span>{item.value}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeRankingItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Form actions */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
        >
          {initialQuestion ? "Mettre à jour" : "Ajouter"}
        </button>
      </div>
    </form>
  );
};

export default QuestionForm;
