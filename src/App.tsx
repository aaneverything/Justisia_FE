import { useState, useEffect } from 'react';
import type { Message } from './types';
import { sendChatMessage } from './services/api';
import ChatInput from './components/chat/ChatInput';
import ChatContainer from './components/chat/ChatContainer';
import Header from './components/Header';

const STORAGE_KEY = 'justisia_chat_history';

// Fallback UUID generator for non-HTTPS contexts
const generateId = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for HTTP contexts
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Helper to serialize/deserialize messages with Date objects
const saveMessages = (messages: Message[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
};

const loadMessages = (): Message[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return parsed.map((msg: Message) => ({
      ...msg,
      timestamp: new Date(msg.timestamp),
    }));
  } catch {
    return [];
  }
};

export function App() {
  const [messages, setMessages] = useState<Message[]>(() => loadMessages());
  const [isLoading, setIsLoading] = useState(false);

  // Save to localStorage whenever messages change
  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  const handleSend = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: generateId(),
      content,
      role: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Get bot response from API
    setIsLoading(true);
    try {
      const response = await sendChatMessage(content);

      const botMessage: Message = {
        id: generateId(),
        content: response.answer,
        role: 'assistant',
        timestamp: new Date(),
        contexts: response.context,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Failed to get response:', error);
      const errorMessage: Message = {
        id: generateId(),
        content: 'Maaf, server tidak dapat dihubungi',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header onNewChat={handleNewChat} />
      <ChatContainer messages={messages} isLoading={isLoading} />
      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
}

export default App;
