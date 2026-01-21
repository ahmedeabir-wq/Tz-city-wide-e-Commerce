import { supabase } from '../supabase';
import { Product } from '../types';

// Fallback data in case the specific Supabase instance is empty or schema mismatch
const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: "Organic Bananas", description: "Fresh tropical bananas from Ecuador", price: 1.20, category: "Fruits", image_url: "https://picsum.photos/400/400?random=1", unit: "kg", stock: 100 },
  { id: 2, name: "Whole Milk", description: "Fresh whole milk, pasteurized", price: 3.50, category: "Dairy", image_url: "https://picsum.photos/400/400?random=2", unit: "L", stock: 50 },
  { id: 3, name: "Sourdough Bread", description: "Artisanal baked sourdough loaf", price: 4.00, category: "Bakery", image_url: "https://picsum.photos/400/400?random=3", unit: "loaf", stock: 20 },
  { id: 4, name: "Chicken Breast", description: "Boneless skinless chicken breast", price: 8.99, category: "Meat", image_url: "https://picsum.photos/400/400?random=4", unit: "kg", stock: 30 },
  { id: 5, name: "Avocados", description: "Ripe Hass avocados", price: 1.50, category: "Fruits", image_url: "https://picsum.photos/400/400?random=5", unit: "each", stock: 80 },
  { id: 6, name: "Cheddar Cheese", description: "Aged sharp cheddar", price: 5.49, category: "Dairy", image_url: "https://picsum.photos/400/400?random=6", unit: "block", stock: 40 },
  { id: 7, name: "Tomato Sauce", description: "Classic marinara sauce", price: 2.99, category: "Pantry", image_url: "https://picsum.photos/400/400?random=7", unit: "jar", stock: 60 },
  { id: 8, name: "Spaghetti Pasta", description: "Durum wheat semolina pasta", price: 1.99, category: "Pantry", image_url: "https://picsum.photos/400/400?random=8", unit: "box", stock: 100 },
];

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase.from('products').select('*');
    
    if (error || !data || data.length === 0) {
      console.warn("Supabase fetch failed or empty, using mock data.", error);
      return MOCK_PRODUCTS;
    }
    
    return data as Product[];
  } catch (e) {
    console.error("Error fetching products:", e);
    return MOCK_PRODUCTS;
  }
};

export const fetchCategories = async (): Promise<string[]> => {
  // Extract unique categories from products
  const products = await fetchProducts();
  return Array.from(new Set(products.map(p => p.category)));
};