export type ChatRole = 'user' | 'assistant';

export interface LegalContext {
  content: string;
  citation: string;
  uu_code: string;
  pasal: string;
  ayat: string;
}

export interface Message {
  id: string;
  content: string;
  role: ChatRole;
  timestamp: Date;
  contexts?: LegalContext[];
}

export interface ChatApiResponse {
  answer: string;
  context: LegalContext[];
}

export interface ChatApiRequest {
  question: string;
}
