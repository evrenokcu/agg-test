import os
import asyncio
import json
from dotenv import load_dotenv
from fastapi import FastAPI
from sse_starlette.sse import EventSourceResponse
from llama_index.llms.openai import OpenAI
from llama_index.llms.anthropic import Anthropic
from llama_index.llms.gemini import Gemini

env_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../.env"))
load_dotenv(dotenv_path=env_path)

# Suppress gRPC warnings
os.environ["GRPC_VERBOSITY"] = "ERROR"
os.environ["GRPC_TRACE"] = ""

MERGE_PROMPT = os.getenv("MERGE_PROMPT","")
EVALUATION_PROMPT = os.getenv("EVALUATION_PROMPT","")

app = FastAPI()

# Set API keys
openai_llm = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
anthropic_llm = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
gemini_llm = Gemini(api_key=os.getenv("GOOGLE_API_KEY"))

llms = [
    {"name": "ChatGPT", "client": openai_llm},
    {"name": "Claude", "client": anthropic_llm},
    {"name": "Gemini", "client": gemini_llm},
]

async def get_response_with_progress(llm, question, send_progress):
    await send_progress(f"Querying {llm['name']}...")
    response = await llm["client"].acomplete(question)
    response_text = response.text if hasattr(response, 'text') else str(response)
    await send_progress(f"Received response from {llm['name']}: {response_text[:50]}...")
    return {"llm": llm["name"], "response": response_text}

async def query_llms_with_progress(question, send_progress):
    tasks = [get_response_with_progress(llm, question, send_progress) for llm in llms]
    return await asyncio.gather(*tasks)

def format_results(results, custom_text):
    result_string = ""
    for result in results:
        result_string += f"==========={result['llm']}============\n{result['response']}\n=============\n"
    result_string += custom_text
    result_string="Each llm response is concatenated by '======== llm name======= response =========='.  response from each llm is as follows. "+ result_string
    return result_string

@app.get("/progress-query")
async def progress_query(question: str):


    q = asyncio.Queue()

    async def send_progress(message):
        await q.put({"data": message})

    async def run_tasks():
        await send_progress("Starting query...")
        results = await query_llms_with_progress(question, send_progress)
        await q.put({"event": "combined", "data": json.dumps(results)})
        await q.put("before complete")
        await q.put({"data": "Processing complete"})
        await q.put("after")

        
        new_question = format_results(results, MERGE_PROMPT)
        #await q.put({"event": "combined", "data": json.dumps(new_question)})
        await q.put("Executing" + new_question)
        results = await query_llms_with_progress(question, send_progress)
        await q.put({"event": "combined", "data": json.dumps(results)})
        
        new_question = format_results(results, EVALUATION_PROMPT)
        await q.put("Executing" + new_question)
        
        result = await get_response_with_progress(llms[0], new_question, send_progress)

        await q.put({"event": "combined", "data": json.dumps(result)})




        await q.put({"event": "close", "data": "Processing complete"})
        
        await q.put(None)  # Close the connection

    async def run_tasks2():
        

        #await q.put(format_results(results,"compare them"))


        await q.put({"event": "close", "data": "Processing complete"})
        
        await q.put(None)  # Close the connection

    async def event_generator():
        while True:
            message = await q.get()
            if message is None:
                break
            yield message

    asyncio.create_task(run_tasks())
    #asyncio.create_task(run_tasks2())
    return EventSourceResponse(event_generator())

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)