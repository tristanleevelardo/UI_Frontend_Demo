import React, { useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({
    study_hours: '',
    attendance_rate: '',
    sleep_hours: '',
    participation: 'medium',
    has_internet: 'yes'
  });

  const [result, setResult] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    setResult(`Prediction: ${data.prediction.toUpperCase()}\nMessage: ${data.message}`);
  };

  return (
    <div className="app-container">
      <h2 className="title">Student Performance Predictor</h2>
      <form className="student-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Study Hours per Week</label>
          <input
            type="number"
            name="study_hours"
            value={form.study_hours}
            onChange={handleChange}
            placeholder="e.g., 10"
            required
          />
        </div>

        <div className="input-group">
          <label>Attendance Rate (%)</label>
          <input
            type="number"
            name="attendance_rate"
            value={form.attendance_rate}
            onChange={handleChange}
            placeholder="e.g., 90"
            required
          />
        </div>

        <div className="input-group">
          <label>Sleep Hours per Night</label>
          <input
            type="number"
            name="sleep_hours"
            value={form.sleep_hours}
            onChange={handleChange}
            placeholder="e.g., 7"
            required
          />
        </div>

        <div className="input-group">
          <label>Class Participation</label>
          <select name="participation" value={form.participation} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="input-group">
          <label>Has Internet Access?</label>
          <select name="has_internet" value={form.has_internet} onChange={handleChange}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <button type="submit" className="submit-button">Predict</button>
      </form>

      <div className="result">
        <h3>Prediction Result:</h3>
        <pre>{result}</pre>
      </div>
    </div>
  );
}

export default App;
