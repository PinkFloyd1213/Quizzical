
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Question } from "../../types/question";
import BasicQuestionFields from "./form/BasicQuestionFields";
import MultipleSelectionField from "./form/MultipleSelectionField";
import MultipleChoiceFields from "./form/MultipleChoiceFields";
import ImageChoiceFields from "./form/ImageChoiceFields";
import ColorChoiceFields from "./form/ColorChoiceFields";
import RankingFields from "./form/RankingFields";
import FormActions from "./form/FormActions";
import { validateQuestion } from "./form/QuestionFormValidation";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === "type") {
      // Reset type-specific fields when switching question types
      setQuestion({
        ...question,
        type: value as any,
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

  const handleAddChoice = (value: string) => {
    setQuestion({
      ...question,
      choices: [
        ...(question.choices || []),
        { id: uuidv4(), value },
      ],
    });
  };

  const handleRemoveChoice = (id: string) => {
    setQuestion({
      ...question,
      choices: (question.choices || []).filter((c) => c.id !== id),
    });
  };

  const handleAddImageChoice = (url: string, alt: string) => {
    setQuestion({
      ...question,
      imageChoices: [
        ...(question.imageChoices || []),
        { id: uuidv4(), url, alt },
      ],
    });
  };

  const handleRemoveImageChoice = (id: string) => {
    setQuestion({
      ...question,
      imageChoices: (question.imageChoices || []).filter((img) => img.id !== id),
    });
  };

  const handleAddColorChoice = (color: string, name: string) => {
    setQuestion({
      ...question,
      colorChoices: [
        ...(question.colorChoices || []),
        { id: uuidv4(), color, name },
      ],
    });
  };

  const handleRemoveColorChoice = (id: string) => {
    setQuestion({
      ...question,
      colorChoices: (question.colorChoices || []).filter((color) => color.id !== id),
    });
  };

  const handleAddRankingItem = (value: string) => {
    setQuestion({
      ...question,
      rankingItems: [
        ...(question.rankingItems || []),
        { id: uuidv4(), value },
      ],
    });
  };

  const handleRemoveRankingItem = (id: string) => {
    setQuestion({
      ...question,
      rankingItems: (question.rankingItems || []).filter((item) => item.id !== id),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateQuestion(question)) {
      onSave(question);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <BasicQuestionFields 
        question={question}
        handleChange={handleChange}
      />
      
      {(question.type === "multiple-choice" ||
        question.type === "image-choice" ||
        question.type === "color-choice") && (
        <MultipleSelectionField
          checked={question.multipleSelection || false}
          onChange={handleMultipleSelectionChange}
        />
      )}

      {question.type === "multiple-choice" && (
        <MultipleChoiceFields
          choices={question.choices || []}
          onAddChoice={handleAddChoice}
          onRemoveChoice={handleRemoveChoice}
        />
      )}

      {question.type === "image-choice" && (
        <ImageChoiceFields
          imageChoices={question.imageChoices || []}
          onAddImageChoice={handleAddImageChoice}
          onRemoveImageChoice={handleRemoveImageChoice}
        />
      )}

      {question.type === "color-choice" && (
        <ColorChoiceFields
          colorChoices={question.colorChoices || []}
          onAddColorChoice={handleAddColorChoice}
          onRemoveColorChoice={handleRemoveColorChoice}
        />
      )}

      {question.type === "ranking" && (
        <RankingFields
          rankingItems={question.rankingItems || []}
          onAddRankingItem={handleAddRankingItem}
          onRemoveRankingItem={handleRemoveRankingItem}
        />
      )}

      <FormActions onCancel={onCancel} isEditing={!!initialQuestion} />
    </form>
  );
};

export default QuestionForm;
