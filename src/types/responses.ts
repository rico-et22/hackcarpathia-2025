// Define the nested category type
export interface Category {
  id: number;
  name: string;
  created_at: string; // ISO formatted date string
  updated_at: string; // ISO formatted date string
}

// Define the main plant type
export interface Plant {
  id: number;
  name: string;
  description: string | null;
  preferred_water_amount: number;
  location: string;
  last_watering: string | null;
  plant_category_id: number;
  user_id: number;
  created_at: string; // ISO formatted date string
  updated_at: string; // ISO formatted date string
  category: Category;
  expected_humidity: number;
  current_humidity: number;
  photo: string;
}
