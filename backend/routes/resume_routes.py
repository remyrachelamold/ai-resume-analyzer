from flask import Blueprint, request, jsonify
from routes.resume_parser import extract_text
from routes.skill_extractor import extract_skills
from routes.ats_analyzer import calculate_ats
from services.ai_feedback import get_feedback
from services.job_matcher import match_resume
from services.resume_improver import improve_resume

resume_bp = Blueprint("resume", __name__)

@resume_bp.route("/api/analyze", methods=["POST"])
def analyze_resume():
    file = request.files["resume"]
    text = extract_text(file)
    feedback = get_feedback(text)
    skills = extract_skills(text)
    ats = calculate_ats(text)
    jd = request.form.get("job_description", "")
    match_result = match_resume(text, jd)
    improved_resume = improve_resume(text)

    return jsonify({
        "skills": skills,
        "ats_score": ats,
        "feedback": feedback,
        "match_score": match_result["match_score"],
        "missing_keywords": match_result["missing_keywords"],
        "improved_resume": improved_resume
    })
