import { useState } from 'react';
import { Scale, User, ChevronDown, ChevronUp, FileText, Copy, Check } from 'lucide-react';
import type { Message, LegalContext } from '@/types';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
}

// Format UU code to readable name
const formatUUCode = (code: string): string => {
  return code.replace(/_/g, ' ').replace(/(\d+)$/, ' $1');
};

// Component to display a single legal source
const SourceCard = ({ context, index }: { context: LegalContext; index: number }) => (
  <div className="bg-background/50 rounded-lg p-3 border border-border/50">
    <div className="flex items-start gap-2">
      <span className="bg-primary/20 text-primary text-xs font-medium px-1.5 py-0.5 rounded shrink-0">
        [{index + 1}]
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-foreground">{context.citation}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{formatUUCode(context.uu_code)}</p>
        <p className="text-xs text-muted-foreground/80 mt-2 line-clamp-3">{context.content}</p>
      </div>
    </div>
  </div>
);

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';
  const [showSources, setShowSources] = useState(false);
  const [copied, setCopied] = useState(false);
  const hasContexts = message.contexts && message.contexts.length > 0;

  const handleCopy = async () => {
    try {
      // Try modern clipboard API first (HTTPS only)
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(message.content);
      } else {
        // Fallback for HTTP contexts
        const textarea = document.createElement('textarea');
        textarea.value = message.content;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div
      className={cn(
        'flex gap-3 p-4 group',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'h-8 w-8 rounded-full flex items-center justify-center shrink-0',
          isUser ? 'bg-primary text-primary-foreground' : 'bg-primary/10'
        )}
      >
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Scale className="h-4 w-4 text-primary" />
        )}
      </div>

      {/* Message bubble */}
      <div
        className={cn(
          'max-w-[70%] rounded-2xl px-4 py-3 text-sm relative',
          isUser
            ? 'bg-primary text-primary-foreground rounded-tr-sm'
            : 'bg-muted rounded-tl-sm'
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>

        {/* Action buttons row */}
        <div className="flex items-center gap-2 mt-2">
          {/* Copy button */}
          <button
            onClick={handleCopy}
            className={cn(
              'flex items-center gap-1 text-xs transition-all',
              isUser
                ? 'text-primary-foreground/70 hover:text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground',
              'opacity-0 group-hover:opacity-100'
            )}
            title="Salin pesan"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" />
                <span>Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Salin</span>
              </>
            )}
          </button>

          {/* Sources toggle button */}
          {hasContexts && (
            <button
              onClick={() => setShowSources(!showSources)}
              className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
            >
              <FileText className="h-3 w-3" />
              <span>{message.contexts!.length} Sumber</span>
              {showSources ? (
                <ChevronUp className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
            </button>
          )}
        </div>

        {/* Sources panel */}
        {hasContexts && showSources && (
          <div className="mt-3 space-y-2">
            {message.contexts!.map((context, index) => (
              <SourceCard key={index} context={context} index={index} />
            ))}
          </div>
        )}

        <span
          className={cn(
            'text-[10px] mt-2 block',
            isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
          )}
        >
          {message.timestamp.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;