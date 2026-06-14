import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def get_feedback(resume_text):
    prompt = f"""
    Analyze this resume and provide:

    1. Strengths
    2. Weaknesses
    3. Suggestions for improvement
    4. Short summary

    Resume:
    {resume_text}
    """

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return response.text

    except Exception as e:
        print("Gemini Error:", e)
        return "AI feedback temporarily unavailable."