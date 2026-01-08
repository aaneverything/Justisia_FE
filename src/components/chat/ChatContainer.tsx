import { useEffect, useRef } from 'react';
import { Scale } from 'lucide-react';
import type { Message } from '@/types';
import ChatMessage from './ChatMessage';

interface ChatContainerProps {
  messages: Message[];
  isLoading?: boolean;
}

const ChatContainer = ({ messages, isLoading }: ChatContainerProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.length === 0 && !isLoading ? (
        // Empty state
        <div className="h-full flex flex-col items-center justify-center text-center p-8">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Scale className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">Selamat datang di Justisia</h3>
          <p className="text-muted-foreground text-sm max-w-md">
            Saya adalah asisten hukum virtual yang siap membantu menjawab pertanyaan Anda seputar hukum di Indonesia. Silakan ketik pertanyaan Anda di bawah.
          </p>
        </div>
      ) : (
        // Messages list
        <div className="max-w-3xl mx-auto py-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex gap-3 p-4">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Scale className="h-4 w-4 text-primary" />
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
