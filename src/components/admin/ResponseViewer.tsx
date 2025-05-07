
import React, { useState, useEffect } from "react";
import { loadResponses, downloadResponsesAsTextFile, clearResponses } from "../../utils/fileUtils";
import { useToast } from "../../hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { FileText, Download, Users } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface ParsedResponse {
  respondentName: string;
  answers: {
    questionId: string;
    questionText: string;
    answer: string | string[] | null;
  }[];
  timestamp: string;
}

interface GroupedResponses {
  [respondentName: string]: ParsedResponse;
}

const ResponseViewer: React.FC = () => {
  const [rawResponses, setRawResponses] = useState<string>("");
  const [parsedResponses, setParsedResponses] = useState<ParsedResponse[]>([]);
  const [groupedResponses, setGroupedResponses] = useState<GroupedResponses>({});
  const [selectedRespondent, setSelectedRespondent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchResponses = async () => {
      setLoading(true);
      try {
        const data = await loadResponses();
        setRawResponses(data);
        
        // Parse responses
        if (data.trim()) {
          const responseGroups: GroupedResponses = {};
          
          // Split by submission (empty lines)
          const submissions = data.split("\n\n").filter(sub => sub.trim());
          
          submissions.forEach(submission => {
            const lines = submission.split("\n").filter(line => line.trim());
            let currentResponse: ParsedResponse = {
              respondentName: "Anonymous",
              answers: [],
              timestamp: new Date().toISOString()
            };
            
            // Parse each line in the submission
            lines.forEach(line => {
              if (line.startsWith("Nom et prénom:")) {
                currentResponse.respondentName = line.replace("Nom et prénom:", "").trim() || "Anonymous";
              } else if (line.startsWith("Date:")) {
                currentResponse.timestamp = line.replace("Date:", "").trim();
              } else if (line.includes(":")) {
                const [questionText, answerText] = line.split(":");
                currentResponse.answers.push({
                  questionId: questionText.trim(),
                  questionText: questionText.trim(),
                  answer: answerText.trim()
                });
              }
            });
            
            // Use respondent name as key
            const respondentKey = currentResponse.respondentName !== "Anonymous" 
              ? currentResponse.respondentName 
              : `Anonymous (${currentResponse.timestamp})`;
              
            responseGroups[respondentKey] = currentResponse;
          });
          
          const parsedResponsesList = Object.values(responseGroups);
          setParsedResponses(parsedResponsesList);
          setGroupedResponses(responseGroups);
          
          // Set first respondent as selected
          if (parsedResponsesList.length > 0) {
            const firstKey = Object.keys(responseGroups)[0];
            setSelectedRespondent(firstKey);
          }
        }
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

  const handleClearResponses = async () => {
    try {
      await clearResponses();
      setRawResponses("");
      setParsedResponses([]);
      setGroupedResponses({});
      setSelectedRespondent("");
      toast({
        title: "Succès",
        description: "Toutes les réponses ont été supprimées",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression des réponses:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer les réponses",
        variant: "destructive",
      });
    }
  };

  // Check if we have any responses
  const hasResponses = parsedResponses.length > 0;
  const selectedResponse = selectedRespondent ? groupedResponses[selectedRespondent] : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Réponses au formulaire
          {hasResponses && (
            <span className="text-sm font-normal text-gray-500">
              ({parsedResponses.length} {parsedResponses.length === 1 ? 'réponse' : 'réponses'})
            </span>
          )}
        </h2>
        <div className="flex flex-col md:flex-row gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="bg-red-600 hover:bg-red-700" disabled={!hasResponses}>
                Supprimer les réponses
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irréversible. Elle supprimera définitivement toutes les réponses collectées et ne peut pas être annulée.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearResponses} className="bg-red-600 hover:bg-red-700">
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          
          <Button
            onClick={handleDownload}
            className="bg-violet-600 hover:bg-violet-700"
            disabled={!hasResponses}
          >
            <Download className="h-4 w-4 mr-2" />
            Télécharger (TXT)
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-violet-500"></div>
        </div>
      ) : hasResponses ? (
        <div className="space-y-6">
          <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-gray-500" />
              <span className="font-medium">Sélectionner un répondant:</span>
            </div>
            
            <Select 
              value={selectedRespondent} 
              onValueChange={setSelectedRespondent}
            >
              <SelectTrigger className="w-full md:w-80">
                <SelectValue placeholder="Choisir un répondant" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(groupedResponses).map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedResponse && (
            <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <h3 className="text-lg font-medium">{selectedResponse.respondentName}</h3>
                <span className="text-sm text-gray-500">
                  Soumis le {new Date(selectedResponse.timestamp).toLocaleDateString()} à {new Date(selectedResponse.timestamp).toLocaleTimeString()}
                </span>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/2">Question</TableHead>
                    <TableHead>Réponse</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedResponse.answers.map((answer, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{answer.questionText}</TableCell>
                      <TableCell>
                        {Array.isArray(answer.answer) 
                          ? answer.answer.join(", ") 
                          : answer.answer || <span className="text-gray-400 italic">Aucune réponse</span>
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center p-8 border border-dashed border-gray-300 rounded-lg">
          <FileText className="mx-auto h-12 w-12 text-gray-300 mb-2" />
          <p className="text-gray-500 font-medium">
            Aucune réponse disponible pour le moment.
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Les réponses s'afficheront ici une fois que des utilisateurs auront soumis le formulaire.
          </p>
        </div>
      )}

      {/* Raw responses (for debugging or advanced users) */}
      {hasResponses && (
        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <details className="text-sm">
            <summary className="cursor-pointer font-medium mb-2 text-gray-600 hover:text-violet-600">
              Afficher les réponses brutes
            </summary>
            <pre className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-64 whitespace-pre-wrap text-gray-600">
              {rawResponses}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
};

export default ResponseViewer;
