// src/data.ts

// 1. کیٹیگریز کا ڈیٹا
export const popularCategories = [
  { name: 'Smartphones', icon: '📱' },
  { name: 'Laptops', icon: '💻' },
  { name: 'Fashion', icon: '👕' },
  { name: 'TV & Audio', icon: '📺' },
  { name: 'Home Appliances', icon: '🏠' },
  { name: 'Cameras', icon: '📷' }
];

// 2. ہاٹ ڈیلز کا ڈیٹا
export const hotDeals = [
  {
    id: 1,
    title: "Ramadan Deals - Nesto",
    location: "Riyadh",
    icon: "🏪",
    startDate: "Feb 17, 2026",
    endDate: "Feb 23, 2026",
    status: "Valid",
    isNew: true,
    price: null
  },
  {
    id: 2,
    title: "Kia Sportage Full Option 2026",
    location: "Jeddah",
    icon: "🚗",
    startDate: "-",
    endDate: "-",
    status: "",
    isNew: false,
    price: "SAR 92,000"
  }
];

// 3. موبائل فونز کا ڈیٹا
export const topProducts = [
  {
    id: 1,
    name: "Samsung Galaxy S24 Ultra, 256GB, Titanium Black",
    startingPrice: "3,899",
    stores: ["Noon", "Amazon"],
    icon: "📱"
  },
  {
    id: 2,
    name: "Apple iPhone 15 Pro Max, 256GB, Natural Titanium",
    startingPrice: "4,699",
    stores: ["Jarir", "Amazon"],
    icon: "📱"
  },
  {
    id: 3,
    name: "Xiaomi 14 Pro, 512GB",
    startingPrice: "2,899",
    stores: ["Extra"],
    icon: "📱"
  },
  {
    id: 4,
    name: "Google Pixel 8 Pro, 128GB",
    startingPrice: "3,299",
    stores: ["Amazon"],
    icon: "📱"
  },
  {
    id: 5,
    name: "OnePlus 12, 256GB, Flowy Emerald",
    startingPrice: "2,999",
    stores: ["Noon"],
    icon: "📱"
  }
];