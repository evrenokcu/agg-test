"use client";

import { useState } from 'react';
import { Askllm } from "@/components/ask-llm"
import { Navigation } from '@/components/navigation';
import { PromptComp } from '@/components/promptComp';


import { DefaultLlmResponse, DefaultLlmResponses as EmptyLlmResponses, insertLlmResponses, LLM_NAMES, LlmResponse, LlmResponses, updateLlmResponses } from '@/components/types';
import { LlmResults } from '@/components/LlmResults';
import { TabOption } from '@/types/aggregator';


export default function Page() {
    const [allResults, setAllResults] = useState<LlmResponses[]>([]);
    const [activeTab, setActiveTab] = useState<TabOption>("Continuous")
    const [isRunning, setIsRunning] = useState(false)
    const [prompt, setPrompt] = useState('');


    const handleSummarize = async (responses: LlmResponses, idx: number) => {
        setIsRunning(true); // Indicate that the function is running
        const allTexts = responses.responses
            .filter((r) => r !== null)
            .map((r) => r!.response)
            .join('\n');

        const summarizePrompt = `summarize all responses from these llms\n${allTexts}`;

        // Choose a random LLM
        const randomLlm = LLM_NAMES[Math.floor(Math.random() * LLM_NAMES.length)];

        // Set the summary status to "pending"
        setAllResults((prev) =>
            updateLlmResponses(prev, idx, (responses) => {
                responses.summary = {
                    llm: randomLlm,
                    response: "",
                    timestamp: new Date().toISOString(),
                    status: "pending",
                };
                return responses;
            })
        );

        try {
            // Perform the API call
            const response = await fetch('/api/process', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: summarizePrompt, llm: randomLlm }),
            });

            if (!response.ok) {
                throw new Error('Network error');
            }

            const data = (await response.json()) as LlmResponse;

            // Update the summary with the API response
            setAllResults((prev) =>
                updateLlmResponses(prev, idx, (responses) => {
                    responses.summary = data;
                    return responses;
                })
            );
        } catch (err) {
            console.error(err);

            // Update the summary with an error response
            setAllResults((prev) =>
                updateLlmResponses(prev, idx, (responses) => {
                    responses.summary = {
                        llm: randomLlm,
                        response: "Failed to summarize responses",
                        timestamp: new Date().toISOString(),
                        status: "error",
                    };
                    return responses;
                })
            );
        } finally {
            // Reset the isRunning state
            setIsRunning(false);
        }
    };

    const handleSubmitNew = async (text: string) => {
        setIsRunning(true);
        const initialResponses = new EmptyLlmResponses();
        const newIndex = allResults.length;
        setAllResults(prev => [...prev, initialResponses]);

        const fetchPromises = LLM_NAMES.map(async (llmName, llmIndex) => {
            // const llmIndex = LLM_NAMES.indexOf(llmName);
            try {
                const response = await fetch('/api/process', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text, llm: llmName })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json() as LlmResponse;

                setAllResults(prev => {
                    return insertLlmResponses(prev, newIndex, llmIndex, () => data)
                });
            } catch (error) {
                console.error(error);
                setAllResults(prev => {
                    return insertLlmResponses(prev, newIndex, llmIndex, () => DefaultLlmResponse.createError(llmName))
                });
            }
        });
        await Promise.all(fetchPromises);
        setIsRunning(false);
    }
    const handleSubmitWithLogging = async (text: string) => {
        setPrompt(text);
        console.log("Calling handleSubmitNew with text:", text);
        try {
            await handleSubmitNew(text); // Call the original function
            console.log("handleSubmitNew completed successfully.");
        } catch (error) {
            console.error("Error in handleSubmitNew:", error);
        }
    };


    return (
        <div className="min-h-screen bg-[#0B1120] text-white flex flex-col">
            <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
            <main className="flex-grow flex flex-col items-center p-6">
                <div className="w-full max-w-[1200px]">
                    <h1>{isRunning}</h1>

                    {allResults.map((results, idx) => (
                        <div key={idx} style={{ margin: '16px 0' }}>
                            <LlmResults
                                results={results}
                                onAssess={(responses) => {
                                    const allTexts = responses.responses
                                        .filter((r) => r !== null)
                                        .map((r) => r!.response)
                                        .join('\n');

                                    const newPrompt = `${allTexts}\nthese are all responses from several llms, check them all and get benefit of each`;
                                    handleSubmitNew(newPrompt);
                                }}
                                onSummarize={(responses) => handleSummarize(responses, idx)}
                            />
                        </div>
                    ))}
                    <PromptComp prompt={prompt} />
                    <Askllm onSubmit={handleSubmitWithLogging} isRunning={isRunning} />


                </div>
            </main>
        </div>

    );
}