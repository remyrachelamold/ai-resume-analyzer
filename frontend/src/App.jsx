import { useState } from "react";
import "./App.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [jobDescription, setJobDescription] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Please upload a resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_description", jobDescription);

    const response = await fetch(
      "http://127.0.0.1:5000/api/analyze",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    setResult(data);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>AI Resume Analyzer</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <textarea
      rows="8"
      cols="60"
      placeholder="Paste Job Description here..."
      value={jobDescription}
      onChange={(e) => setJobDescription(e.target.value)}
    />

    <br /><br />

      <button onClick={handleUpload}>
        Analyze Resume
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <div style={{ width: 200, height: 200 }}>
  <CircularProgressbar
    value={result.ats_score}
    text={`${result.ats_score}%`}
  />
</div>

          <h3>Skills Found:</h3>

          <ul>
            {result.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>

          <h3>AI Feedback</h3>
<pre
  style={{
    whiteSpace: "pre-wrap",
    background: "#eee",
    padding: "10px",
  }}
>
  {result.feedback}
</pre>

<h3>Job Match Score</h3>
<p>{result.match_score}%</p>

<h3>Missing Keywords</h3>

<ul>
  {result.missing_keywords.map((word, i) => (
    <li key={i}>{word}</li>
  ))}
</ul>

<h2>AI Improved Resume</h2>

<textarea
  rows={20}
  cols={100}
  value={result.improved_resume}
  readOnly
/>

        </div>
      )}
    </div>
  );
}

export default App;