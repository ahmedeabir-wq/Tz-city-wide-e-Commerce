import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { getRecipeSuggestion } from '../services/geminiService';

const SmartChef: React.FC = () => {
  const { cart } = useCart();
  const [suggestion, setSuggestion] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleGetRecipe = async () => {
    if (cart.length === 0) {
      setSuggestion("Your cart is empty! Add some fresh ingredients first.");
      return;
    }
    
    setLoading(true);
    const ingredients = cart.map(item => item.name);
    const result = await getRecipeSuggestion(ingredients);
    setSuggestion(result);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-white rounded-full shadow-sm text-primary">
          <i className="fa-solid fa-wand-magic-sparkles text-xl"></i>
        </div>
        <div>
          <h3 className="font-bold text-lg text-secondary">FreshCity Smart Chef</h3>
          <p className="text-sm text-gray-600">Don't know what to cook? Let AI help!</p>
        </div>
      </div>

      <div className="mb-4">
        <button
          onClick={handleGetRecipe}
          disabled={loading}
          className="w-full py-2 px-4 bg-white border border-primary text-primary font-medium rounded-lg hover:bg-emerald-50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
             <i className="fa-solid fa-circle-notch fa-spin"></i>
          ) : (
            <i className="fa-solid fa-utensils"></i>
          )}
          {loading ? "Thinking..." : "Suggest Recipes from My Cart"}
        </button>
      </div>

      {suggestion && (
        <div className="bg-white rounded-lg p-4 text-sm text-gray-700 shadow-sm animate-fade-in border border-gray-100">
           <div className="prose prose-sm max-w-none whitespace-pre-line">
             {suggestion}
           </div>
        </div>
      )}
    </div>
  );
};

export default SmartChef;