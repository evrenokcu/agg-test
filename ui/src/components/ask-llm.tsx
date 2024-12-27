"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Paperclip, Send } from 'lucide-react'
import React, { useState } from 'react';

interface LlmInquiryProps {
  onSubmit: (text: string) => void;
  isRunning: boolean
}

export function Askllm({ onSubmit, isRunning }: LlmInquiryProps) {
  const [inputText, setInputText] = useState('');

  const handleClick = () => {
    onSubmit(inputText);
    setInputText('');
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default behavior of Enter
      handleClick();
    }
  };
  return (
    <div className="flex items-center space-x-2 bg-gray-800/50 p-2 rounded-lg">
      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white" disabled={isRunning}>
        <Paperclip className="h-5 w-5" />
      </Button>
      <Input
        disabled={isRunning}
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="enter your question here"
        className="flex-grow bg-transparent border-0 text-white placeholder-gray-400 focus:ring-0"
      />
      <Button size="icon" className="bg-blue-600 hover:bg-blue-700" onClick={handleClick} disabled={isRunning} >
        <Send className="h-5 w-5" />
      </Button>
    </div>
  )
}

