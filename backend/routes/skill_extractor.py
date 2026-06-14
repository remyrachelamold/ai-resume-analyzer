SKILLS_DB = [
    "python",
    "java",
    "sql",
    "react",
    "flask",
    "machine learning",
    "tensorflow",
    "pandas",
    "numpy",
    "javascript",
    "nodejs"
]

def extract_skills(text):
    text = text.lower()

    found = []

    for skill in SKILLS_DB:
        if skill in text:
            found.append(skill)

    return found