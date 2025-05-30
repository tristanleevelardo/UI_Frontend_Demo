import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    Age: '',
    Gender: 'Male',
    Height_cm: '',
    Weight_kg: '',
    Activity_Level: 'Sedentary',
    Diet_Preference: 'None'
  });

  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponseData(null);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          Age: parseInt(formData.Age),
          Height_cm: parseFloat(formData.Height_cm),
          Weight_kg: parseFloat(formData.Weight_kg),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      setResponseData(data);
    } catch (err) {
      console.error('Error:', err);
      setError('Something went wrong while contacting the server.');
    }
  };

  return (
    <div className="App">
      <h1>Personalized Nutrition Planner</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Age:
          <input
            type="number"
            name="Age"
            value={formData.Age}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Gender:
          <select name="Gender" value={formData.Gender} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>

        <label>
          Height (cm):
          <input
            type="number"
            name="Height_cm"
            value={formData.Height_cm}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Weight (kg):
          <input
            type="number"
            name="Weight_kg"
            value={formData.Weight_kg}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Activity Level:
          <select name="Activity_Level" value={formData.Activity_Level} onChange={handleChange}>
            <option value="Sedentary">Sedentary</option>
            <option value="Light">Light</option>
            <option value="Moderate">Moderate</option>
            <option value="Active">Active</option>
            <option value="Very Active">Very Active</option>
          </select>
        </label>

        <label>
          Diet Preference:
          <select name="Diet_Preference" value={formData.Diet_Preference} onChange={handleChange}>
            <option value="None">None</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Keto">Keto</option>
            <option value="Pescatarian">Pescatarian</option>
          </select>
        </label>

        <button type="submit">Get Recommendation</button>
      </form>

      {error && <p className="error">{error}</p>}

      {responseData && (
        <div className="result">
          <h2>Results</h2>
          <p><strong>BMI:</strong> {responseData.BMI}</p>
          <p><strong>Goal:</strong> {responseData.Goal}</p>
          <p><strong>Calories:</strong> {responseData.Recommended_Calories} kcal</p>
          <p><strong>Protein:</strong> {responseData.Recommended_Protein} g</p>
          <p><strong>Carbs:</strong> {responseData.Recommended_Carbs} g</p>
          <p><strong>Fats:</strong> {responseData.Recommended_Fats} g</p>
          <p><strong>Meal Plan:</strong> {responseData.Recommended_Meal_Plan}</p>
        </div>
      )}
    </div>
  );
}

export default App;
