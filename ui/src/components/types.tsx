export interface LlmResponse {
    llm: string;
    response: string;
    timestamp: string;
    status: string;
    assessment?: string;
}

export interface LlmResponses {
    responses: Array<LlmResponse>;
    summary: LlmResponse;
}
export class DefaultLlmResponse implements LlmResponse {
    llm: string;
    response: string;
    timestamp: string;
    status: string;
    assessment?: string;

    constructor(llm: string, status: string) {
        this.llm = llm;
        this.response = "";
        this.timestamp = new Date().toISOString();
        this.status = status;
        this.assessment = undefined;
    }

    // Factory method to create a response with status 'pending'
    static createPending(llm: string): DefaultLlmResponse {
        return new DefaultLlmResponse(llm, "pending");
    }

    // Factory method to create a response with status 'created'
    static createCreated(llm: string): DefaultLlmResponse {
        return new DefaultLlmResponse(llm, "created");
    }
    static createError(llm: string): DefaultLlmResponse {
        return new DefaultLlmResponse(llm, "error");
    }
}

export const LLM_NAMES = ["Claude", "ChatGPT", "Gemini"];

export class DefaultLlmResponses implements LlmResponses {
    responses: Array<LlmResponse>;
    summary: LlmResponse;

    constructor() {
        this.responses = LLM_NAMES.map((name) => DefaultLlmResponse.createPending(name));
        this.summary = DefaultLlmResponse.createCreated(LLM_NAMES[0]);
    }
}
export function updateLlmResponses(
    llmResponsesArray: LlmResponses[],
    idx: number,
    updateFn: (item: LlmResponses) => LlmResponses
): LlmResponses[] {
    if (idx < 0 || idx >= llmResponsesArray.length) {
        throw new Error("Index out of bounds");
    }
    const updated = [...llmResponsesArray];
    const currentResponses = { ...updated[idx] };
    updated[idx] = updateFn(currentResponses);
    return updated;
}
export function insertLlmResponses(
    llmResponsesArray: LlmResponses[],
    newIndex: number,
    llmIndex: number,
    updateFn: () => LlmResponse
): LlmResponses[] {
    //Ensure the index is valid
    if (llmIndex < 0 || llmIndex > llmResponsesArray.length + 1) {
        throw new Error("Index out of bounds");
    }
    const updated = [...llmResponsesArray];
    const currentResponses = { ...updated[newIndex] };
    const newResponses = [...currentResponses.responses];
    newResponses[llmIndex] = updateFn();
    currentResponses.responses = newResponses;
    updated[newIndex] = currentResponses;
    return updated;
}

export function formatTimestamp(isoString: string): string {
    const timestamp = new Date(isoString);
    const today = new Date();

    // Check if the timestamp is today
    const isToday =
        timestamp.getDate() === today.getDate() &&
        timestamp.getMonth() === today.getMonth() &&
        timestamp.getFullYear() === today.getFullYear();

    if (isToday) {
        // Return time only if it's today
        return timestamp.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    // Otherwise, return date and time
    return `${timestamp.toLocaleDateString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })} ${timestamp.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
    })}`;
}
