import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, X } from 'lucide-react';
import { formatTimestamp, LlmResponse } from '@/components/types';

interface LlmCardProps {
    response: LlmResponse;
    className?: string;
}

export function LlmCard({ response, className }: LlmCardProps) {
    const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleExpand = (llm: string) => {
        setExpandedCards(prev => ({ ...prev, [llm]: !prev[llm] }));
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const getAvatarStyles = (llm: string) => {
        switch (llm) {
            case "Claude":
                return "bg-orange-200";
            case "ChatGPT":
                return "bg-emerald-200";
            case "Gemini":
                return "bg-blue-200";
        }
    };

    if (response.status === "created") {
        return null;
    }

    return (
        <>
            {/* Regular Card */}
            <Card className={`flex-shrink-0 w-[1000px] bg-gray-800/50 border-gray-700 ${className}`}>
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getAvatarStyles(response.llm)}`}>
                            <span className="text-sm font-semibold text-gray-800">{response.llm[0]}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-white text-lg">{response.llm}</span>
                            <span className="text-sm text-emerald-500">{response.status}</span>
                            <span className="text-sm text-gray-400">{formatTimestamp(response.timestamp)}</span>
                        </div>
                    </div>
                    <div className="text-white text-base leading-relaxed mb-4 h-[200px] overflow-y-auto">
                        <p>
                            {expandedCards[response.llm]
                                ? response.response
                                : `${response.response.slice(0, 200)}...`}
                        </p>
                        {response.response.length > 200 && (
                            <Button
                                variant="link"
                                onClick={() => toggleExpand(response.llm)}
                                className="mt-2 text-blue-400 hover:text-blue-300"
                            >
                                {expandedCards[response.llm] ? 'See less' : 'See more'}
                            </Button>
                        )}
                        {response.assessment && (
                            <div className="mt-4 p-2 bg-purple-900/30 rounded">
                                <h4 className="font-semibold mb-2">Assessment:</h4>
                                <p>{response.assessment}</p>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-start gap-4">
                        <Button variant="outline" size="sm" className="bg-white text-gray-800">
                            <Save className="w-4 h-4 mr-2" />
                            Save
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-white text-gray-800"
                            onClick={openModal} // Open modal on click
                        >
                            Expand Full
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Modal for Full-Screen View */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
                    <div className="w-[90vw] h-[90vh] bg-white overflow-auto relative rounded-lg shadow-lg">
                        <div className="absolute top-4 right-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-800 hover:text-red-600"
                                onClick={closeModal}
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                        <Card className="w-full h-full rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getAvatarStyles(response.llm)}`}>
                                        <span className="text-sm font-semibold text-gray-800">{response.llm[0]}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-black text-lg">{response.llm}</span>
                                        <span className="text-sm text-emerald-500">{response.status}</span>
                                        <span className="text-sm text-gray-400">{formatTimestamp(response.timestamp)}</span>
                                    </div>
                                </div>
                                <div className="text-black text-base leading-relaxed mb-4 overflow-y-auto">
                                    <p>{response.response}</p>
                                    {response.assessment && (
                                        <div className="mt-4 p-2 bg-purple-100 rounded">
                                            <h4 className="font-semibold mb-2">Assessment:</h4>
                                            <p>{response.assessment}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            )}
        </>
    );
}