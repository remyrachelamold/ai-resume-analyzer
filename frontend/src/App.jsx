import { useState } from "react";
import "./App.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please upload a resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_description", jobDescription);

    try {
      setLoading(true);
    
      const response = await fetch(
        "http://127.0.0.1:5000/api/analyze",
        {
          method: "POST",
          body: formData,
        }
      );
    
      const data = await response.json();
      setResult(data);
    }
    catch (error) {
      console.error(error);
      alert("Error analyzing resume");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>AI Resume Analyzer</h1>

      <div
  className={`dropzone ${dragActive ? "active" : ""}`}
  onDragEnter={(e) => {
    e.preventDefault();
    setDragActive(true);
  }}
  onDragOver={(e) => {
    e.preventDefault();
    setDragActive(true);
  }}
  onDragLeave={(e) => {
    e.preventDefault();
    setDragActive(false);
  }}
  onDrop={(e) => {
    e.preventDefault();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      alert("Please upload a PDF file.");
    }
  }}
>
  <input
    type="file"
    accept=".pdf"
    id="resume-upload"
    hidden
    onChange={(e) => setFile(e.target.files[0])}
  />

  <label htmlFor="resume-upload">
    <p>
      {file
        ? `📄 ${file.name}`
        : "Drag & Drop your resume here or click to browse"}
    </p>
  </label>
</div>

      <br /><br />

      <textarea
      rows="8"
      cols="60"
      placeholder="Paste Job Description here..."
      value={jobDescription}
      onChange={(e) => setJobDescription(e.target.value)}
    />

    <br /><br />

    <button onClick={handleUpload} disabled={loading}>
  {loading ? "Analyzing..." : "Analyze Resume"}
</button>

      {result && (
        <div className="results">
       <div className="card">
  <h2>ATS Score</h2>

  <div className="score">
    <CircularProgressbar
      value={result.ats_score}
      text={`${result.ats_score}%`}
    />
  </div>
</div>

<div className="card">
  <h2>Skills Found</h2>

  <div>
    {result.skills.map((skill, index) => (
      <span className="skill" key={index}>
        {skill}
      </span>
    ))}
  </div>
</div>

<div className="card">
  <h2>AI Feedback</h2>

  <pre className="feedback">
    {result.feedback}
  </pre>
</div>          

<div className="card">
  <h2>Job Match Score</h2>

  <h1>{result.match_score}%</h1>

  <h3>Missing Keywords</h3>

  <ul>
  {result.missing_keywords.map((word, i) => (
    <li key={i}>{word}</li>
  ))}
</ul>
</div>

<div className="card">
  <h2>AI Improved Resume</h2>

  <button
    onClick={() =>
      navigator.clipboard.writeText(
        result.improved_resume
      )
    }
  >
    Copy Resume
  </button>

  <br /><br />

  <textarea
    rows={20}
    value={result.improved_resume}
    readOnly
  />
</div>

<footer
  style={{
    textAlign: "center",
    marginTop: "40px",
    color: "gray",
  }}
>
  Built with React, Flask and Gemini AI
</footer>

        </div>
      )}
    </div>
  );
}

export default App;