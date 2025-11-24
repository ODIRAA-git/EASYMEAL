import React, { useState } from "react";

function RecipeSearch() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchRecipes = async () => {
    if (!ingredients.trim()) {
      setError("Please enter at least one ingredient.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Format ingredients: "tomato, cheese" → "tomato,cheese"
      const query = ingredients
        .split(",")
        .map((i) => i.trim())
        .join(",");

      const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY; // ← your .env variable

      if (!apiKey) {
        throw new Error("API key not found. Please add VITE_SPOONACULAR_API_KEY to your .env file");
      }

      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&number=5&apiKey=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recipes.");
      }

      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      setError("Something went wrong. Try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "auto" }}>
      <h2>Search Recipes by Ingredients</h2>

      {/* Input field */}
      <input
        type="text"
        placeholder="e.g. chicken, rice, tomatoes"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "6px",
        }}
      />

      {/* Search button */}
      <button
        onClick={searchRecipes}
        style={{
          width: "100%",
          padding: "10px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Search
      </button>

      {loading && <p>Loading recipes...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Results */}
      <div style={{ marginTop: "20px" }}>
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              marginBottom: "10px",
              borderRadius: "6px",
            }}
          >
            <h3>{recipe.title}</h3>
            <img
              src={recipe.image}
              alt={recipe.title}
              style={{ width: "100%", borderRadius: "6px" }}
            />
            <p>
              Used Ingredients: {recipe.usedIngredientCount} <br />
              Missing Ingredients: {recipe.missedIngredientCount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeSearch;
