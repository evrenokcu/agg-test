"use client";

import { useState } from "react";
import { formatTimestamp } from "./types";

interface PromptProps {
    prompt: string;
}

export function PromptComp({ prompt }: PromptProps) {
    const [promptTime] = useState(new Date().toISOString());

    // Render only if `prompt` is not an empty string
    if (!prompt.trim()) {
        return null;
    }

    return (
        <div className="w-full max-w-[1200px] mb-6">
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0" />
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">Omvi</span>
                        <span className="text-sm text-gray-400">{formatTimestamp(promptTime)}</span>
                    </div>
                    <p className="text-lg">
                        {prompt}
                    </p>
                </div>
            </div>
        </div>
    );
}