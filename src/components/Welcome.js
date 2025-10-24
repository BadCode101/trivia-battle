import React, { useState, useEffect } from "react";

export default function WelcomeScreen({ onStart }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then(res => res.json())
      .then(data => {
        if (data && data.trivia_categories) {
          setCategories(data.trivia_categories);
          setSelectedCategory(data.trivia_categories[0].id); 
        }
      })
      .catch(err => console.error("Failed to fetch categories", err));
  }, []);

  //Start from welcome with choice selection
  const handleStart = () => {
    onStart({ category: selectedCategory, difficulty: selectedDifficulty });
  };

  return (
    <div className="welcome-screen">
      <h1>Welcome to Trivia Battle!</h1>

      <div className="dropdown-group">
        <label>Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="dropdown-group">
        <label>Difficulty:</label>
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <button className="start-btn" onClick={handleStart}>
        Start Game
      </button>
    </div>
  );
}
