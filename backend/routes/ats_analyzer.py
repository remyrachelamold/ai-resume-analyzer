def calculate_ats(text):
    text = text.lower()

    keywords = [
        "experience",
        "skills",
        "projects",
        "education",
        "certifications",
        "internship",
        "github",
        "linkedin"
    ]

    score = 0

    for keyword in keywords:
        if keyword in text:
            score += 12

    return min(score, 100)