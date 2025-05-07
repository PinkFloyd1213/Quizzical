
import { Question, FormResponse, FormSettings } from "../types/question";

export const loadQuestions = async (): Promise<Question[]> => {
  try {
    const questions = localStorage.getItem('questions');
    return questions ? JSON.parse(questions) : [];
  } catch (error) {
    console.error('Error loading questions:', error);
    return [];
  }
};

export const saveQuestions = async (questions: Question[]): Promise<void> => {
  try {
    localStorage.setItem('questions', JSON.stringify(questions));
  } catch (error) {
    console.error('Error saving questions:', error);
    throw error;
  }
};

export const downloadQuestionsAsJsonFile = (): void => {
  loadQuestions().then(questions => {
    const dataStr = JSON.stringify(questions, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileName = 'questions.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  });
};

export const downloadQuestionTemplateAsJsonFile = (): void => {
  const template = [
    {
      id: "1",
      text: "Your question here?",
      type: "text",
      required: true
    }
  ];
  const dataStr = JSON.stringify(template, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  
  const exportFileName = 'question_template.json';

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileName);
  document.body.appendChild(linkElement);
  linkElement.click();
  document.body.removeChild(linkElement);
};

export const importQuestionsFromJsonFile = async (file: File): Promise<Question[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const jsonString = event.target?.result as string;
        const questions = JSON.parse(jsonString) as Question[];
        resolve(questions);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        reject(error);
      }
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
      reject(error);
    };

    reader.readAsText(file);
  });
};

export const clearResponses = async (): Promise<void> => {
  try {
    localStorage.removeItem('formResponses');
  } catch (error) {
    console.error('Error clearing responses:', error);
    throw error;
  }
};

export const saveAdminPassword = (password: string): void => {
  localStorage.setItem('adminPassword', password);
};

export const loadFormSettings = async (): Promise<FormSettings> => {
  try {
    const settings = localStorage.getItem('formSettings');
    if (settings) {
      return JSON.parse(settings);
    }
    // Default settings
    const defaultSettings: FormSettings = {
      collectRespondentInfo: false
    };
    await saveFormSettings(defaultSettings);
    return defaultSettings;
  } catch (error) {
    console.error('Error loading form settings:', error);
    return { collectRespondentInfo: false };
  }
};

export const saveFormSettings = async (settings: FormSettings): Promise<void> => {
  try {
    localStorage.setItem('formSettings', JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving form settings:', error);
    throw error;
  }
};

// Update the saveResponse function to include respondent name
export const saveResponse = async (response: FormResponse[]): Promise<void> => {
  try {
    const existingResponsesText = localStorage.getItem('formResponses') || '';
    let newResponseText = '';
    
    if (response.length > 0 && response[0].respondentName) {
      // Add respondent name as header
      newResponseText += `\n==== Réponse de: ${response[0].respondentName} - ${new Date().toLocaleString()} ====\n`;
    } else {
      newResponseText += `\n==== Nouvelle réponse - ${new Date().toLocaleString()} ====\n`;
    }
    
    response.forEach(item => {
      newResponseText += `${item.questionText}: ${Array.isArray(item.answer) ? item.answer.join(', ') : item.answer}\n`;
    });
    
    const updatedResponsesText = existingResponsesText + newResponseText;
    localStorage.setItem('formResponses', updatedResponsesText);
  } catch (error) {
    console.error('Error saving form response:', error);
    throw error;
  }
};

// Make sure default admin password is 12345
export const getAdminPassword = (): string => {
  const savedPassword = localStorage.getItem('adminPassword');
  if (!savedPassword) {
    // Set default password to 12345
    saveAdminPassword('12345');
    return '12345';
  }
  return savedPassword;
};

// Add the missing functions for ResponseViewer
export const loadResponses = async (): Promise<string> => {
  try {
    return localStorage.getItem('formResponses') || '';
  } catch (error) {
    console.error('Error loading responses:', error);
    return '';
  }
};

export const downloadResponsesAsTextFile = (): void => {
  loadResponses().then(responses => {
    if (!responses) {
      return;
    }
    
    const dataUri = 'data:text/plain;charset=utf-8,' + encodeURIComponent(responses);
    const exportFileName = 'form_responses.txt';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  });
};
