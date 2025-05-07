
export type QuestionType = 
  | "text" 
  | "boolean" 
  | "multiple-choice" 
  | "image-choice" 
  | "color-choice" 
  | "ranking";

export interface Choice {
  id: string;
  value: string;
}

export interface ImageChoice {
  id: string;
  url: string;
  alt: string;
}

export interface ColorChoice {
  id: string;
  color: string;
  name: string;
}

export interface RankingItem {
  id: string;
  value: string;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  required: boolean;
  choices?: Choice[];
  imageChoices?: ImageChoice[];
  colorChoices?: ColorChoice[];
  rankingItems?: RankingItem[];
  multipleSelection?: boolean;
}

export interface FormResponse {
  questionId: string;
  questionText: string;
  answer: string | string[] | null;
  timestamp: string;
  respondentName?: string;
}

export interface FormSettings {
  collectRespondentInfo: boolean;
}
