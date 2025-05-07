
import React, { useState } from "react";
import { Check } from "lucide-react";
import { Question } from "../../types/question";

interface ImageChoiceQuestionProps {
  question: Question;
  onAnswer: (answer: string | string[] | null) => void;
  currentAnswer?: string | string[] | null;
}

const ImageChoiceQuestion: React.FC<ImageChoiceQuestionProps> = ({
  question,
  onAnswer,
  currentAnswer,
}) => {
  const isMultiple = question.multipleSelection || false;
  
  // Handle both string and array formats for currentAnswer
  const initialValue = currentAnswer
    ? Array.isArray(currentAnswer)
      ? currentAnswer.map(a => typeof a === "string" && a.includes("(url:") ? a.split("(url:")[0].trim() : a)
      : [typeof currentAnswer === "string" && currentAnswer.includes("(url:") ? currentAnswer.split("(url:")[0].trim() : currentAnswer]
    : [];

  const [selectedImages, setSelectedImages] = useState<string[]>(initialValue);

  const handleImageClick = (imageId: string) => {
    if (isMultiple) {
      const updatedImages = selectedImages.includes(imageId)
        ? selectedImages.filter((id) => id !== imageId)
        : [...selectedImages, imageId];
      
      setSelectedImages(updatedImages);
      onAnswer(updatedImages.length ? updatedImages : null);
    } else {
      setSelectedImages([imageId]);
      onAnswer(imageId);
    }
  };

  return (
    <div className="space-y-4 w-full">
      <label className="block text-lg font-medium">
        {question.text} {question.required && <span className="text-red-500">*</span>}
      </label>
      
      {isMultiple && (
        <p className="text-sm text-gray-600 italic">
          Vous pouvez sélectionner plusieurs images
        </p>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {question.imageChoices?.map((image) => (
          <div
            key={image.id}
            className={`relative cursor-pointer rounded-lg overflow-hidden transition-all ${
              selectedImages.includes(image.id)
                ? "ring-4 ring-violet-500"
                : "hover:opacity-90"
            }`}
            onClick={() => handleImageClick(image.id)}
          >
            {selectedImages.includes(image.id) && (
              <div className="absolute top-2 right-2 bg-violet-600 rounded-full w-8 h-8 flex items-center justify-center">
                <Check className="h-5 w-5 text-white" />
              </div>
            )}
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-auto object-cover aspect-square"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageChoiceQuestion;
