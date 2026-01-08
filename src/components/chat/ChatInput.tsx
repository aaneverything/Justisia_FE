import { useState } from "react";
import { Button } from "../ui/button";
import { Send } from 'lucide-react';
import React from 'react'

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({onSend, disabled}: ChatInputProps) => {
const [input, setInput] = useState('')

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(input.trim() && !disabled){
        onSend(input.trim())
    }
    setInput('')
}
  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-background">
      <div className="flex items-center gap-3 max-w-3xl mx-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          disabled={disabled}
          className="flex-1 bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all disabled:opacity-50"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || disabled}
          className="h-11 w-11 rounded-xl shrink-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}

export default ChatInput