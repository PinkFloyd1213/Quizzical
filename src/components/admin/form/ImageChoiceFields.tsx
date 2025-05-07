
import React, { useState } from "react";
import { ImageChoice } from "../../../types/question";

interface ImageChoiceFieldsProps {
  imageChoices: ImageChoice[];
  onAddImageChoice: (url: string, alt: string) => void;
  onRemoveImageChoice: (id: string) => void;
}

const ImageChoiceFields: React.FC<ImageChoiceFieldsProps> = ({
  imageChoices = [],
  onAddImageChoice,
  onRemoveImageChoice,
}) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageAlt, setImageAlt] = useState<string>("");

  const handleAddImage = () => {
    if (!imageUrl.trim()) return;
    onAddImageChoice(imageUrl.trim(), imageAlt.trim() || imageUrl.trim());
    setImageUrl("");
    setImageAlt("");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Images</h3>
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
          onClick={handleAddImage}
          className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
        >
          Ajouter l'image
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {imageChoices.map((img) => (
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
              onClick={() => onRemoveImageChoice(img.id)}
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-700"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageChoiceFields;
