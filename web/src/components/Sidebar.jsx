import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';

const Sidebar = ({ onSearch }) => {

  const { darkMode } = useTheme();
  const [ingredients, setIngredients] = useState(['']);

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients.length > 0 ? newIngredients : ['']);
  };

  const updateIngredient = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleSearch = () => {
  const filledIngredients = ingredients.filter(ing => ing.trim() !== '');
  if (filledIngredients.length === 0) {
    alert('Please add at least one ingredient');
    return;
  }

  // Call the function passed from Dashboard
  if (onSearch) {
    onSearch(filledIngredients);
  }
};


  return (
    <div style={{
      width: '100%',
      maxWidth: '300px',
      backgroundColor: darkMode ? '#2a2a2a' : '#fff',
      boxShadow: darkMode ? '2px 0 4px rgba(255,255,255,0.1)' : '2px 0 4px rgba(0,0,0,0.1)',
      padding: 'clamp(1rem, 2vw, 1.5rem)',
      height: '100%',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 'clamp(0.75rem, 2vw, 1rem)'
    }}>
      {/* Sidebar Header */}
      <div>
        <h2 style={{
          fontSize: 'clamp(1rem, 3vw, 1.25rem)',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          color: darkMode ? '#fff' : '#333'
        }}>
          🔍 Find Recipes
        </h2>
        <p style={{
          fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
          color: darkMode ? '#ccc' : '#666',
          marginBottom: '1rem'
        }}>
          Add ingredients you have and discover delicious recipes!
        </p>
      </div>

      {/* Ingredients List */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        <label style={{
          fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
          fontWeight: '600',
          color: darkMode ? '#ccc' : '#555'
        }}>
          Ingredients
        </label>

        {ingredients.map((ingredient, index) => (
          <div key={index} style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center'
          }}>
            <input
              type="text"
              value={ingredient}
              onChange={(e) => updateIngredient(index, e.target.value)}
              placeholder={`Ingredient ${index + 1}`}
              style={{
                flex: 1,
                padding: '0.5rem',
                border: darkMode ? '1px solid #444' : '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '0.875rem',
                outline: 'none',
                transition: 'border-color 0.2s',
                backgroundColor: darkMode ? '#1a1a1a' : '#fff',
                color: darkMode ? '#fff' : '#000'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
              onBlur={(e) => e.target.style.borderColor = darkMode ? '#444' : '#ddd'}
            />
            {ingredients.length > 1 && (
              <button
                onClick={() => removeIngredient(index)}
                style={{
                  width: '30px',
                  height: '30px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Remove ingredient"
              >
                ×
              </button>
            )}
          </div>
        ))}

        {/* Add Ingredient Button */}
        <button
          onClick={addIngredient}
          style={{
            padding: '0.5rem',
            backgroundColor: darkMode ? '#1a1a1a' : '#fff',
            color: '#4CAF50',
            border: '2px dashed #4CAF50',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = darkMode ? '#2a2a2a' : '#f1f8f4';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = darkMode ? '#1a1a1a' : '#fff';
          }}
        >
          + Add Ingredient
        </button>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        style={{
          padding: 'clamp(0.625rem, 2vw, 0.75rem)',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
          fontWeight: 'bold',
          marginTop: '1rem',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
      >
        🔍 Search Recipes
      </button>

      {/* Quick Tips */}
      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        backgroundColor: darkMode ? '#1a1a1a' : '#f9fafb',
        borderRadius: '5px',
        fontSize: '0.75rem',
        color: darkMode ? '#ccc' : '#666'
      }}>
        <strong>💡 Tips:</strong>
        <ul style={{ margin: '0.5rem 0 0 1rem', paddingLeft: '0.5rem' }}>
          <li>Add multiple ingredients</li>
          <li>Be specific (e.g., "chicken breast")</li>
          <li>Remove items you don't have</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
