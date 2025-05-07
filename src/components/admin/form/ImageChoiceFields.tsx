
import React, { useState } from "react";
import { ImageChoice } from "../../../types/question";
import { Button } from "../../ui/button";
import { Upload, Loader } from "lucide-react";

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
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleAddImage = () => {
    if (!imageUrl.trim()) return;
    onAddImageChoice(imageUrl.trim(), imageAlt.trim() || imageUrl.trim());
    setImageUrl("");
    setImageAlt("");
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append("image", file);
      
      const response = await fetch("https://api.imgur.com/3/image", {
        method: "POST",
        headers: {
          Authorization: "Client-ID 546c25a59c58ad7",
        },
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.success) {
        setImageUrl(data.data.link);
        
        // If no alt text, use the filename
        if (!imageAlt.trim()) {
          setImageAlt(file.name.split('.')[0]);
        }
      } else {
        console.error("Failed to upload image:", data);
        alert("Échec du téléchargement de l'image. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Erreur lors du téléchargement de l'image. Veuillez réessayer.");
    } finally {
      setIsUploading(false);
      // Clear the input value to allow uploading the same file again
      event.target.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Images</h3>
      <div className="space-y-2">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="URL de l'image..."
          />
          
          <label className="cursor-pointer">
            <div className="p-2 bg-blue-500 rounded text-white flex items-center justify-center">
              {isUploading ? <Loader className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </label>
        </div>
        
        <input
          type="text"
          value={imageAlt}
          onChange={(e) => setImageAlt(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="Description de l'image (alt)..."
        />
        
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddImage}
            disabled={!imageUrl.trim() || isUploading}
            className={`flex-1 px-4 py-2 ${!imageUrl.trim() || isUploading ? 'bg-gray-400' : 'bg-violet-600 hover:bg-violet-700'} text-white rounded-lg transition-colors`}
          >
            Ajouter l'image
          </button>
        </div>
        
        {isUploading && (
          <div className="flex items-center justify-center p-2">
            <Loader className="h-5 w-5 animate-spin mr-2" />
            <span>Téléchargement en cours...</span>
          </div>
        )}
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
