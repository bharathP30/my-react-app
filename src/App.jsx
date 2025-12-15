import { useState } from 'react';

export default function App() {
  
  const [favorites, setFavorites] = useState([]);
  const [palette, setPalette] = useState([]);
  
  // Generate random color
  const randColor = () => {
    const code = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    return `#${code}`;
  }

  // Generate new palette of 5 colors
  const newPalette = () => {
    const colors = [];
    for (let i = 0; i < 5; i++) {
      colors.push(randColor());
    } 
    setPalette(colors);
  }

  // Add color to favorites
  const addToFavorites = (color) => {
    const alreadyExists = favorites.some(fav => fav === color);
    if (!alreadyExists) {
      setFavorites([...favorites, color]);
    }
  }

  // Remove color from favorites - FIXED!
  const removeFromFavorites = (colorToRemove) => {
    setFavorites(favorites.filter(color => color !== colorToRemove));
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          🎨 Color Palette Generator
        </h1>
        
        <button 
          onClick={newPalette} 
          className="bg-green-500 px-auto py-4 max-w-lg w-full text-white font-sans font-thin text-3xl rounded-lg hover:bg-green-800 transition duration-300 mb-6 mx-auto block"
        >
          Generate new palette
        </button>

        <h2 className="text-white text-2xl text-center mt-4 mb-4">Current Palette</h2>
      
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {palette.length === 0 ? (
            <p className="text-lg text-center col-span-full text-gray-400 font-semibold py-8">
              Click "Generate New Palette" to get Cards
            </p>
          ) : (  
            palette.map((color, index) => (
              <div 
                key={index}
                onClick={() => addToFavorites(color)}
                style={{ backgroundColor: color }}
                className="h-32 rounded-lg cursor-pointer hover:scale-105 transition flex items-center justify-center shadow-lg"
              >
                <span className="bg-black bg-opacity-50 text-white px-3 py-1 rounded font-mono text-sm">
                  {color}
                </span>
              </div>
            )) 
          )}
        </div>

        <h2 className="text-white text-2xl text-center mt-8 mb-4">⭐ My Favorites</h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {favorites.length === 0 ? (
            <p className="text-lg text-center col-span-full text-gray-400 font-semibold py-8">
              No favorite colors yet
            </p>
          ) : ( 
            favorites.map((color, index) => (
              <div 
                key={index}
                style={{ backgroundColor: color }}
                className="h-32 rounded-lg relative shadow-lg flex items-center justify-center"
              >
                <span className="bg-black bg-opacity-50 text-white px-3 py-1 rounded font-mono text-sm">
                  {color}
                </span>
                <button
                  onClick={() => removeFromFavorites(color)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white w-8 h-8 rounded-full font-bold"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}