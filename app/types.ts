export interface Store {
  id: string;
  name: string;
  logo_url: string;
  created_at?: string;
}

export interface Category {
  id: string;
  name: string;
  created_at?: string;
}

export interface Product {
  id: string;
  title: string;
  current_price: number;
  old_price?: number;
  image_url: string;
  store_name: string;
  city: string;
  category: string;
  created_at?: string;
}