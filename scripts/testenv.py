from dotenv import load_dotenv
import os


# Load environment variables from .env
load_dotenv()

# Debug: Print the loaded values
print("OPENAI_API_KEY:", os.getenv("OPENAI_API_KEY"))
print("ANTHROPIC_API_KEY:", os.getenv("ANTHROPIC_API_KEY"))
print("GOOGLE_API_KEY:", os.getenv("GOOGLE_API_KEY"))