import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useTheme } from '../ThemeContext';
import DashboardNavbar from '../components/DashboardNavbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import carbonaraImg from '../assets/carbonara.jpg';
import avocadoToastImg from '../assets/avocadoToast.webp';
import chickenSaladImg from '../assets/chickenSalad.jpg';



const Dashboard = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [searchResults, setSearchResults] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

const handleIngredientSearch = async (ingredientsArray) => {
  try {
    const query = ingredientsArray.join(',');
    const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

    console.log('API Key:', apiKey ? 'Found' : 'NOT FOUND');
    console.log('Searching for:', query);

    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
      alert('⚠️ Please add your actual Spoonacular API key to the .env file!\n\n1. Go to https://spoonacular.com/food-api/console#Profile\n2. Copy your API key\n3. Open /web/.env file\n4. Replace YOUR_API_KEY_HERE with your key\n5. Restart the dev server');
      return;
    }

    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&number=10&apiKey=${apiKey}`;
    console.log('Fetching from:', url.replace(apiKey, 'API_KEY_HIDDEN'));

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`API returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    setSearchResults(data);
    console.log('✅ Search results:', data);

    if (data.length === 0) {
      alert('No recipes found with those ingredients. Try different ones!');
    } else {
      alert(`✅ Found ${data.length} recipes!`);
    }
  } catch (error) {
    console.error("❌ Error searching recipes:", error);
    alert(`Error: ${error.message}\n\nCheck the browser console (F12) for more details.`);
  }
};

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Sample recipe data with ingredients
  const recipes = [
    {
      id: 1,
      name: 'Spaghetti Carbonara',
      image: carbonaraImg,
      description: 'A quick and delicious Italian pasta recipe.',
      time: '30 min',
      difficulty: 'Easy',
      ingredients: [
        '400g spaghetti',
        '200g pancetta or guanciale',
        '4 large eggs',
        '100g Pecorino Romano cheese (grated)',
        '100g Parmesan cheese (grated)',
        'Black pepper (freshly ground)',
        'Salt for pasta water'
      ]
    },
    {
      id: 2,
      name: 'Avocado Toast',
      image: avocadoToastImg,
      description: 'Simple, healthy, and perfect for breakfast.',
      time: '10 min',
      difficulty: 'Very Easy',
      ingredients: [
        '2 ripe avocados',
        '4 slices of whole grain bread',
        '1 lemon (juiced)',
        'Salt and pepper to taste',
        'Red pepper flakes (optional)',
        'Cherry tomatoes (optional)',
        'Feta cheese (optional)'
      ]
    },
    {
      id: 3,
      name: 'Chicken Salad',
      image: chickenSaladImg,
      description: 'Fresh and light salad with grilled chicken.',
      time: '20 min',
      difficulty: 'Easy',
      ingredients: [
        '2 chicken breasts (grilled)',
        'Mixed salad greens',
        '1 cucumber (sliced)',
        '2 tomatoes (diced)',
        '1 red onion (sliced)',
        'Olive oil',
        'Balsamic vinegar',
        'Salt and pepper to taste'
      ]
    }
  ];

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: darkMode ? 'none' : 'url(/src/assets/food3.jpeg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: darkMode ? '#1a1a1a' : 'transparent',
      zIndex: 9999
    }}>
      {/* Navbar */}
      <DashboardNavbar />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          display: 'none',
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          zIndex: 10001,
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
        }}
        className="mobile-menu-btn"
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>

      {/* Main Content Area */}
      <div style={{
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Sidebar */}
        <div style={{
          position: 'absolute',
          left: sidebarOpen ? 0 : '-100%',
          top: 0,
          height: '100%',
          transition: 'left 0.3s ease',
          zIndex: 10000
        }} className="sidebar-container">
          <Sidebar onSearch={handleIngredientSearch} />
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 9999
            }}
            className="sidebar-overlay"
          />
        )}

        {/* Main Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: 'clamp(1rem, 3vw, 2rem)',
          backgroundColor: darkMode ? 'rgba(18, 18, 18, 0.95)' : 'rgba(249, 250, 251, 0.85)',
          width: '100%'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {/* Welcome Section */}
            <div style={{
              backgroundColor: darkMode ? '#2a2a2a' : 'white',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              boxShadow: darkMode ? '0 1px 3px rgba(255,255,255,0.1)' : '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: darkMode ? '#fff' : '#333',
                marginBottom: '0.5rem'
              }}>
                Welcome back, {user?.email?.split('@')[0]}! 👋
              </h1>
              <p style={{
                color: darkMode ? '#ccc' : '#666',
                fontSize: '1rem'
              }}>
                Discover delicious recipes based on the ingredients you have.
              </p>
            </div>
            


            {/* Recipe Section */}
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: darkMode ? '#fff' : '#333'
            }}>
              Featured Recipes
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => handleRecipeClick(recipe)}
                  style={{
                    backgroundColor: darkMode ? '#2a2a2a' : 'white',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: darkMode ? '0 1px 3px rgba(255,255,255,0.1)' : '0 1px 3px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = darkMode ? '0 4px 8px rgba(255,255,255,0.15)' : '0 4px 8px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = darkMode ? '0 1px 3px rgba(255,255,255,0.1)' : '0 1px 3px rgba(0,0,0,0.1)';
                  }}
                >
                  <img
                    src={recipe.image}
                    alt={`Recipe ${recipe.id}`}
                    style={{
                      width: '100%',
                      height: '180px',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ padding: '1rem' }}>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: 'bold',
                      marginBottom: '0.5rem',
                      color: darkMode ? '#fff' : '#333'
                    }}>
                      {recipe.name}
                    </h3>
                    <p style={{
                      fontSize: '0.875rem',
                      color: darkMode ? '#ccc' : '#666',
                      marginBottom: '0.75rem'
                    }}>
                      {recipe.description}
                    </p>
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem',
                      flexWrap: 'wrap'
                    }}>
                      <span style={{
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.5rem',
                        backgroundColor: '#e8f5e9',
                        color: '#2e7d32',
                        borderRadius: '12px'
                      }}>
                        🕐 {recipe.time}
                      </span>
                      <span style={{
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.5rem',
                        backgroundColor: '#e3f2fd',
                        color: '#1565c0',
                        borderRadius: '12px'
                      }}>
                        🍳 {recipe.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* API Search Results */}
{searchResults.length > 0 && (
  <>
    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: darkMode ? '#fff' : '#333' }}>
      Search Results
    </h2>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
      {searchResults.map((recipe) => (
        <div
          key={recipe.id}
          onClick={() => handleRecipeClick(recipe)}
          style={{
            backgroundColor: darkMode ? '#2a2a2a' : 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: darkMode ? '0 1px 3px rgba(255,255,255,0.1)' : '0 1px 3px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = darkMode ? '0 4px 8px rgba(255,255,255,0.15)' : '0 4px 8px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = darkMode ? '0 1px 3px rgba(255,255,255,0.1)' : '0 1px 3px rgba(0,0,0,0.1)';
          }}
        >
          <img
            src={recipe.image}
            alt={recipe.title}
            style={{ width: '100%', height: '180px', objectFit: 'cover' }}
          />
          <div style={{ padding: '1rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem', color: darkMode ? '#fff' : '#333' }}>
              {recipe.title}
            </h3>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <span style={{
                fontSize: '0.75rem',
                padding: '0.25rem 0.5rem',
                backgroundColor: '#e8f5e9',
                color: '#2e7d32',
                borderRadius: '12px'
              }}>
                ✅ {recipe.usedIngredientCount} match
              </span>
              <span style={{
                fontSize: '0.75rem',
                padding: '0.25rem 0.5rem',
                backgroundColor: '#fff3e0',
                color: '#e65100',
                borderRadius: '12px'
              }}>
                +{recipe.missedIngredientCount} more
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </>
)}


            {/* Ingredients Modal */}
            {selectedRecipe && (
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10000,
                  padding: '1rem'
                }}
                onClick={closeModal}
              >
                <div
                  style={{
                    backgroundColor: darkMode ? '#2a2a2a' : 'white',
                    borderRadius: '16px',
                    maxWidth: '600px',
                    width: '100%',
                    maxHeight: '80vh',
                    overflow: 'auto',
                    position: 'relative'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={closeModal}
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: 'none',
                      backgroundColor: '#f44336',
                      color: 'white',
                      fontSize: '1.25rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 1
                    }}
                  >
                    ×
                  </button>

                  {/* Recipe Image */}
                  <img
                    src={selectedRecipe.image}
                    alt={selectedRecipe.name || selectedRecipe.title}
                    style={{
                      width: '100%',
                      height: '250px',
                      objectFit: 'cover',
                      borderTopLeftRadius: '16px',
                      borderTopRightRadius: '16px'
                    }}
                  />

                  {/* Recipe Details */}
                  <div style={{ padding: '2rem' }}>
                    <h2 style={{
                      fontSize: '1.75rem',
                      fontWeight: 'bold',
                      marginBottom: '0.5rem',
                      color: darkMode ? '#fff' : '#333'
                    }}>
                      {selectedRecipe.name || selectedRecipe.title}
                    </h2>
                    {selectedRecipe.description && (
                      <p style={{
                        color: darkMode ? '#ccc' : '#666',
                        marginBottom: '1rem',
                        fontSize: '1rem'
                      }}>
                        {selectedRecipe.description}
                      </p>
                    )}

                    {/* Time and Difficulty - Only for featured recipes */}
                    {selectedRecipe.time && selectedRecipe.difficulty && (
                      <div style={{
                        display: 'flex',
                        gap: '0.75rem',
                        marginBottom: '1.5rem'
                      }}>
                        <span style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#e8f5e9',
                          color: '#2e7d32',
                          borderRadius: '8px',
                          fontSize: '0.875rem',
                          fontWeight: '500'
                        }}>
                          🕐 {selectedRecipe.time}
                        </span>
                        <span style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#e3f2fd',
                          color: '#1565c0',
                          borderRadius: '8px',
                          fontSize: '0.875rem',
                          fontWeight: '500'
                        }}>
                          🍳 {selectedRecipe.difficulty}
                        </span>
                      </div>
                    )}

                    {/* API Recipe Stats */}
                    {selectedRecipe.usedIngredients && (
                      <div style={{
                        display: 'flex',
                        gap: '0.75rem',
                        marginBottom: '1.5rem'
                      }}>
                        <span style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#e8f5e9',
                          color: '#2e7d32',
                          borderRadius: '8px',
                          fontSize: '0.875rem',
                          fontWeight: '500'
                        }}>
                          ✅ {selectedRecipe.usedIngredientCount} ingredients you have
                        </span>
                        <span style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#fff3e0',
                          color: '#e65100',
                          borderRadius: '8px',
                          fontSize: '0.875rem',
                          fontWeight: '500'
                        }}>
                          🛒 {selectedRecipe.missedIngredientCount} more needed
                        </span>
                      </div>
                    )}

                    {/* Featured Recipe Ingredients */}
                    {selectedRecipe.ingredients && (
                      <>
                        <h3 style={{
                          fontSize: '1.25rem',
                          fontWeight: '600',
                          marginBottom: '1rem',
                          color: darkMode ? '#fff' : '#333'
                        }}>
                          📝 Ingredients
                        </h3>
                        <ul style={{
                          listStyle: 'none',
                          padding: 0,
                          margin: 0
                        }}>
                          {selectedRecipe.ingredients.map((ingredient, index) => (
                            <li
                              key={index}
                              style={{
                                padding: '0.75rem',
                                marginBottom: '0.5rem',
                                backgroundColor: darkMode ? '#1a1a1a' : '#f9fafb',
                                borderRadius: '8px',
                                borderLeft: '4px solid #4CAF50',
                                fontSize: '0.9375rem',
                                color: darkMode ? '#fff' : '#333'
                              }}
                            >
                              • {ingredient}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {/* API Recipe Ingredients - Separated by what user has and needs */}
                    {selectedRecipe.usedIngredients && (
                      <>
                        {/* Ingredients You Have */}
                        <h3 style={{
                          fontSize: '1.25rem',
                          fontWeight: '600',
                          marginBottom: '1rem',
                          color: darkMode ? '#fff' : '#333'
                        }}>
                          ✅ Ingredients You Have
                        </h3>
                        <ul style={{
                          listStyle: 'none',
                          padding: 0,
                          margin: 0,
                          marginBottom: '1.5rem'
                        }}>
                          {selectedRecipe.usedIngredients.map((ingredient, index) => (
                            <li
                              key={index}
                              style={{
                                padding: '0.75rem',
                                marginBottom: '0.5rem',
                                backgroundColor: darkMode ? '#1a3a1a' : '#e8f5e9',
                                borderRadius: '8px',
                                borderLeft: '4px solid #4CAF50',
                                fontSize: '0.9375rem',
                                color: darkMode ? '#90ee90' : '#2e7d32'
                              }}
                            >
                              ✓ {ingredient.original}
                            </li>
                          ))}
                        </ul>

                        {/* Ingredients You'll Need */}
                        {selectedRecipe.missedIngredients.length > 0 && (
                          <>
                            <h3 style={{
                              fontSize: '1.25rem',
                              fontWeight: '600',
                              marginBottom: '1rem',
                              color: darkMode ? '#fff' : '#333'
                            }}>
                              🛒 You'll Also Need
                            </h3>
                            <ul style={{
                              listStyle: 'none',
                              padding: 0,
                              margin: 0
                            }}>
                              {selectedRecipe.missedIngredients.map((ingredient, index) => (
                                <li
                                  key={index}
                                  style={{
                                    padding: '0.75rem',
                                    marginBottom: '0.5rem',
                                    backgroundColor: darkMode ? '#3a2a1a' : '#fff3e0',
                                    borderRadius: '8px',
                                    borderLeft: '4px solid #ff9800',
                                    fontSize: '0.9375rem',
                                    color: darkMode ? '#ffcc80' : '#e65100'
                                  }}
                                >
                                  ○ {ingredient.original}
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
