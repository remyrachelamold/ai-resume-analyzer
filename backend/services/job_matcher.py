def match_resume(resume_text, jd_text):
    resume_words = set(resume_text.lower().split())
    jd_words = set(jd_text.lower().split())

    common = resume_words.intersection(jd_words)

    if len(jd_words) == 0:
        score = 0
    else:
        score = int((len(common) / len(jd_words)) * 100)

    missing = list(jd_words - resume_words)

    return {
        "match_score": min(score, 100),
        "missing_keywords": missing[:20]
    }