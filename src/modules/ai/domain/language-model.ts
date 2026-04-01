export enum LanguageModelMessageRole {
  System = "system",
  User = "user",
  Assistant = "assistant",
}

export type LanguageModelMessage = {
  role: LanguageModelMessageRole;
  text: string;
};

export type LanguageModelTextInput = {
  messages: LanguageModelMessage[];
  temperature?: number;
  maxTokens?: number;
};

export type LanguageModelResponse = {
  text: string;
  usage:{
    totalTokens?: string;
  }
};

export interface LanguageModel {
  generateText(input: LanguageModelTextInput): Promise<LanguageModelResponse>;
}
