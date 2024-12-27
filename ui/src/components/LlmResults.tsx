"use client";
import React from 'react';
import { LlmResponses } from './types';
import { ScrollArea } from "@/components/ui/scroll-area"

import { LlmCard } from './LlmCard';


import { AssessCompareButton } from './assess-compare-button';
import { SummarizeButton } from './summarize-button';

interface LlmResultsProps {
    results: LlmResponses;
    onAssess: (responses: LlmResponses) => void;
    onSummarize: (responses: LlmResponses) => void;
}

export function LlmResults({ results, onAssess: onAssess, onSummarize }: LlmResultsProps) {


    const handleAssessCompare = () => {
        onAssess(results);
    }
    const handleSummarize = () => {
        // setIsSummarizing(true)
        // Here you would typically call an API to generate the summary
        // For now, we'll just set a timeout to simulate the process
        //setTimeout(() => {
        //    setIsSummarizing(false)
        //}, 2000)
        onSummarize(results);
    }
    return (
        <div>

            <ScrollArea className="w-full">
                <div
                    className={`flex ${results.responses.length === 1 ? "justify-center" : "justify-center space-x-4"
                        } pb-4`}
                >
                    {results.responses.map((response, idx) => (
                        <LlmCard
                            key={idx}
                            response={response}
                            className={results.responses.length === 1 ? "w-full max-w-[350px]" : "flex-shrink-0 w-[350px]"}
                        />
                    ))}
                </div>
            </ScrollArea>
            <div className="llm-results-container">
                <div className="w-full flex justify-center gap-4 mb-6">
                    <AssessCompareButton onAssessCompare={handleAssessCompare} />
                    <SummarizeButton onSummarize={handleSummarize} />
                </div>
                {results.summary && (
                    <div className="flex justify-center">
                        <LlmCard response={results.summary} className="justify-center" />
                    </div>
                )}
            </div>
        </div>
    );
}