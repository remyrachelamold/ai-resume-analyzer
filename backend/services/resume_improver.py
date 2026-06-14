from google import genai
from dotenv import load_dotenv
import os

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def improve_resume(text):
    prompt = f"""
You are an expert recruiter.

Rewrite and improve the following resume professionally.

Enhance:
- Work experience
- Project descriptions
- Technical skills
- Achievements

Keep all information truthful.
Do not invent facts.

Resume:

{text}
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return response.text

    except Exception as e:
        print("Gemini Error:", e)
        return "AI resume improvement temporarily unavailable due to API limits."