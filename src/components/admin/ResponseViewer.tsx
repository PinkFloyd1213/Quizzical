
import React, { useState, useEffect } from "react";
import { loadResponses, downloadResponsesAsTextFile } from "../../utils/fileUtils";

const ResponseViewer: React.FC = () => {
  const [responses, setResponses] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchResponses = async () => {
      setLoading(true);
      try {
        const data = await loadResponses();
        setResponses(data);
      } catch (error) {
        console.error("Erreur lors du chargement des réponses:", error);
      }
      setLoading(false);
    };

    fetchResponses();
  }, []);

  const handleDownload = () => {
    downloadResponsesAsTextFile();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Réponses au formulaire</h2>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          disabled={!responses}
        >
          Télécharger les réponses (TXT)
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-violet-500"></div>
        </div>
      ) : responses ? (
        <pre className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap">
          {responses}
        </pre>
      ) : (
        <div className="text-center p-8 border border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500">
            Aucune réponse disponible pour le moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default ResponseViewer;
