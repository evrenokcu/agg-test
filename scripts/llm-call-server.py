import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from llama_index.llms.openai import OpenAI
from llama_index.llms.anthropic import Anthropic
from llama_index.llms.gemini import Gemini
from datetime import datetime

# Get current datetime in ISO format


# Load environment variables
# env_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../.env"))
# load_dotenv(dotenv_path=env_path)

# Suppress gRPC warnings
os.environ["GRPC_VERBOSITY"] = "ERROR"
os.environ["GRPC_TRACE"] = ""

# Initialize FastAPI
app = FastAPI()

# Define request body schema
class QueryRequest(BaseModel):
    llm_name: str
    prompt: str

# Initialize LLM clients
llms = {
    "ChatGPT": OpenAI(api_key=os.getenv("OPENAI_API_KEY")),
    "Claude": Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY")),
    "Gemini": Gemini(api_key=os.getenv("GOOGLE_API_KEY")),
}

@app.post("/query-llm")
async def query_llm(request: QueryRequest):
    """
    Query the specified LLM with a given prompt and return the response as a string.
    """
    llm_name = request.llm_name
    prompt = request.prompt

    # Check if the specified LLM is supported
    if llm_name not in llms:
        raise HTTPException(status_code=400, detail=f"LLM '{llm_name}' not supported. Available: {list(llms.keys())}")
    
    # Get the corresponding LLM client
    llm_client = llms[llm_name]

    # Query the LLM
    try:
        response = await llm_client.acomplete(prompt)
        response_text = response.text if hasattr(response, 'text') else str(response)
        return {"llm": llm_name, "response": response_text, "timestamp":datetime.now().isoformat(), "status":"completed"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error querying {llm_name}: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(app, host="0.0.0.0", port=8080)