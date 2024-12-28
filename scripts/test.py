import os
from fastapi import FastAPI
from fastapi.responses import HTMLResponse

# Initialize FastAPI app
app = FastAPI()

@app.get("/", response_class=HTMLResponse)
async def root():
    env_variable = os.getenv("MERGE_PROMPT", "Environment variable not set")
    x="evren"
    """
    Return a simple HTML page.
    """
    return f"""
    <!DOCTYPE html>
    <html>
        <head>
            <title>LLM Call Server</title>
        </head>
        <body>
            <h1>Welcome to the LLM Call Server</h1>
            <p>This is a basic FastAPI server.</p>
            <p>Environment Variable: {env_variable}</p>
            <p>Environment Variable: {x}</p>
        </body>
    </html>
    """

if __name__ == "__main__":
    import uvicorn

    # Use the $PORT environment variable set by Cloud Run
    port = int(os.getenv("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
